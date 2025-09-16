/**
 * ProjectContext
 * Holds per-project state: homeowner, milestones, documents, messages.
 * Implements actions with mutual-acceptance workflow and changelog.
 */

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { publish, channels } from '../services/realtime'

const ProjectContext = createContext(null)

export const useProject = () => {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}

/**
 * Helper: now timestamp
 */
const now = () => new Date().toISOString()

/**
 * Changelog entry factory
 */
const logEntry = (actor, action, details) => ({ id: `${Date.now()}_${Math.random()}`, actor, action, details, at: now() })

/**
 * Mutual acceptance states for milestones
 * - draft: created locally, not sent
 * - proposed: awaiting other-party acceptance
 * - active: accepted by both parties
 * - completed: finished and confirmed
 */

export const ProjectProvider = ({ projectId, initial, children }) => {
  // initial: { homeowner, milestones, documents, messages, contractorUserId, homeownerUserId }
  const [homeowner, setHomeowner] = useState(initial?.homeowner || null)
  const [milestones, setMilestones] = useState(initial?.milestones || [])
  const [documents, setDocuments] = useState(initial?.documents || [])
  const [messages, setMessages] = useState(initial?.messages || [])
  const contractorUserId = initial?.contractorUserId || 'contractor_1'
  const homeownerUserId = initial?.homeownerUserId || 'homeowner_1'
  const actorRef = useRef(contractorUserId) // default actor (contractor)

  const setActor = useCallback((userId) => { actorRef.current = userId }, [])

  const notify = useCallback((userId, payload) => {
    publish(channels.notifications(userId), { projectId, ...payload })
  }, [projectId])

  const addChangelog = (milestone, entry) => ({ ...milestone, changelog: [...(milestone.changelog || []), entry] })

  // Propose milestone
  const proposeMilestone = useCallback((data) => {
    const milestone = {
      id: `ms_${Date.now()}`,
      title: data.title,
      description: data.description || '',
      estimatedDate: data.estimatedDate || null,
      amount: Number(data.amount || 0),
      status: 'proposed', // draft -> proposed -> active -> completed
      acceptance: {
        contractorAccepted: true,
        homeownerAccepted: false,
      },
      attachments: [],
      changelog: [logEntry(actorRef.current, 'propose', { title: data.title })],
      createdAt: now(),
      updatedAt: now(),
    }

    setMilestones((prev) => [milestone, ...prev])
    publish(channels.milestones(projectId), { type: 'milestone_proposed', milestone })
    notify(homeownerUserId, { type: 'milestone_proposed', milestoneId: milestone.id, title: milestone.title })
    return milestone
  }, [projectId, notify, homeownerUserId])

  // Accept milestone (other party)
  const acceptMilestone = useCallback((milestoneId, by) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m }
      if (by === 'homeowner') next.acceptance.homeownerAccepted = true
      if (by === 'contractor') next.acceptance.contractorAccepted = true
      if (next.acceptance.homeownerAccepted && next.acceptance.contractorAccepted) {
        next.status = 'active'
      }
      next.updatedAt = now()
      return addChangelog(next, logEntry(by, 'accept_milestone', {}))
    }))
    publish(channels.milestones(projectId), { type: 'milestone_accepted', milestoneId, by })
  }, [projectId])

  // Request edit (creates edit request needing other-party acceptance)
  const requestEditMilestone = useCallback((milestoneId, patch) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m, pendingEdit: { ...patch, requestedBy: actorRef.current, requestedAt: now() }, status: 'pending_acceptance' }
      return addChangelog(next, logEntry(actorRef.current, 'request_edit', { patch }))
    }))
    publish(channels.milestones(projectId), { type: 'milestone_edit_requested', milestoneId, patch })
    notify(homeownerUserId, { type: 'milestone_edit_requested', milestoneId })
  }, [projectId, notify, homeownerUserId])

  // Confirm edit
  const confirmEditMilestone = useCallback((milestoneId, accepted) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m }
      if (!next.pendingEdit) return next
      if (accepted) {
        Object.assign(next, {
          title: next.pendingEdit.title ?? next.title,
          description: next.pendingEdit.description ?? next.description,
          estimatedDate: next.pendingEdit.estimatedDate ?? next.estimatedDate,
          amount: next.pendingEdit.amount != null ? Number(next.pendingEdit.amount) : next.amount,
        })
        next.status = 'active'
        next = addChangelog(next, logEntry(actorRef.current, 'confirm_edit', { accepted: true }))
      } else {
        next.status = next.acceptance?.homeownerAccepted && next.acceptance?.contractorAccepted ? 'active' : 'proposed'
        next = addChangelog(next, logEntry(actorRef.current, 'confirm_edit', { accepted: false }))
      }
      delete next.pendingEdit
      next.updatedAt = now()
      return next
    }))
    publish(channels.milestones(projectId), { type: 'milestone_edit_confirmed', milestoneId, accepted })
  }, [projectId])

  // Request delete
  const requestDeleteMilestone = useCallback((milestoneId) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m, pendingDelete: { requestedBy: actorRef.current, requestedAt: now() }, status: 'pending_acceptance' }
      return addChangelog(next, logEntry(actorRef.current, 'request_delete', {}))
    }))
    publish(channels.milestones(projectId), { type: 'milestone_delete_requested', milestoneId })
    notify(homeownerUserId, { type: 'milestone_delete_requested', milestoneId })
  }, [projectId, notify, homeownerUserId])

  // Confirm delete
  const confirmDeleteMilestone = useCallback((milestoneId, accepted) => {
    if (!accepted) {
      setMilestones((prev) => prev.map((m) => {
        if (m.id !== milestoneId) return m
        const next = { ...m }
        delete next.pendingDelete
        next.status = next.acceptance?.homeownerAccepted && next.acceptance?.contractorAccepted ? 'active' : 'proposed'
        return addChangelog(next, logEntry(actorRef.current, 'confirm_delete', { accepted: false }))
      }))
      publish(channels.milestones(projectId), { type: 'milestone_delete_confirmed', milestoneId, accepted })
      return
    }
    setMilestones((prev) => prev.filter((m) => m.id !== milestoneId))
    publish(channels.milestones(projectId), { type: 'milestone_deleted', milestoneId })
  }, [projectId])

  // Upload progress images tied to milestone
  const uploadProgressImages = useCallback((milestoneId, images /* [{id,url,caption,size,type}] */) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m, attachments: [...(m.attachments || []), ...images] }
      return addChangelog(next, logEntry(actorRef.current, 'upload_images', { count: images.length }))
    }))
    publish(channels.milestones(projectId), { type: 'milestone_images_uploaded', milestoneId })
  }, [projectId])

  // Advance milestone (mark complete -> triggers homeowner confirmation before payment)
  const markMilestoneComplete = useCallback((milestoneId) => {
    setMilestones((prev) => prev.map((m) => {
      if (m.id !== milestoneId) return m
      const next = { ...m, status: 'completed', completedAt: now() }
      return addChangelog(next, logEntry(actorRef.current, 'mark_complete', {}))
    }))
    publish(channels.milestones(projectId), { type: 'milestone_completed', milestoneId })
    notify(homeownerUserId, { type: 'milestone_completed', milestoneId })
  }, [projectId, notify, homeownerUserId])

  // Create payment request for milestone (requires homeowner confirmation)
  const requestPayment = useCallback((milestoneId, applicationFee = 0) => {
    // Stub: publish event; actual backend would create payment intent and link
    publish(channels.milestones(projectId), { type: 'payment_requested', milestoneId, applicationFee })
    notify(homeownerUserId, { type: 'payment_requested', milestoneId })
  }, [projectId, notify, homeownerUserId])

  // Documents
  const uploadDocument = useCallback((doc /* {name,category,type,url,size,milestoneId?,description,version?} */) => {
    const document = { id: `doc_${Date.now()}`, ...doc, uploadedAt: now(), sharedWithHomeowner: true, homeownerViewed: false }
    setDocuments((prev) => [document, ...prev])
    publish(channels.documents(projectId), { type: 'document_uploaded', document })
    notify(homeownerUserId, { type: 'document_uploaded', documentId: document.id })
    // Link milestone <-> document if provided
    if (document.milestoneId) {
      setMilestones((prev) => prev.map((m) => m.id === document.milestoneId ? addChangelog({ ...m }, logEntry(actorRef.current, 'link_document', { documentId: document.id })) : m))
    }
    return document
  }, [projectId, notify, homeownerUserId])

  const value = useMemo(() => ({
    projectId,
    homeowner,
    milestones,
    documents,
    messages,
    setActor,
    // milestone actions
    proposeMilestone,
    acceptMilestone,
    requestEditMilestone,
    confirmEditMilestone,
    requestDeleteMilestone,
    confirmDeleteMilestone,
    uploadProgressImages,
    markMilestoneComplete,
    requestPayment,
    // documents
    uploadDocument,
  }), [projectId, homeowner, milestones, documents, messages, setActor, proposeMilestone, acceptMilestone, requestEditMilestone, confirmEditMilestone, requestDeleteMilestone, confirmDeleteMilestone, uploadProgressImages, markMilestoneComplete, requestPayment, uploadDocument])

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}


