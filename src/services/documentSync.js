/**
 * Document Sync Service
 * 
 * This service automatically syncs progress images from the escrow timeline
 * to the documents page, ensuring all project-related files are centralized.
 */

// Sync progress images from timeline checkpoints to documents
export const syncProgressImagesFromTimeline = (checkpoints) => {
  const progressImages = []
  
  checkpoints.forEach(checkpoint => {
    if (checkpoint.photos && checkpoint.photos.length > 0) {
      checkpoint.photos.forEach(photo => {
        progressImages.push({
          id: `timeline_${checkpoint.id}_${photo.id}`,
          name: photo.caption || `${checkpoint.title} - Progress Photo`,
          category: 'progress_images',
          type: 'image',
          url: photo.url,
          size: 245760, // Estimated size - would be actual in real app
          uploadedBy: 'contractor',
          uploadedAt: checkpoint.completedDate || checkpoint.dueDate,
          milestone: checkpoint.title,
          description: photo.caption || `Progress photo for ${checkpoint.title}`,
          sharedWithHomeowner: true,
          homeownerViewed: checkpoint.homeownerApproved || false,
          isFromTimeline: true // Flag to identify timeline-sourced images
        })
      })
    }
  })
  
  return progressImages
}

// Sync documents back to timeline (when documents are uploaded with milestone links)
export const syncDocumentsToTimeline = (documents, checkpoints) => {
  const updatedCheckpoints = checkpoints.map(checkpoint => {
    // Find documents linked to this checkpoint
    const linkedDocs = documents.filter(doc => 
      doc.milestone === checkpoint.title && !doc.isFromTimeline
    )
    
    if (linkedDocs.length > 0) {
      // Add non-timeline documents as additional attachments
      return {
        ...checkpoint,
        attachments: linkedDocs.map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          url: doc.url,
          category: doc.category
        }))
      }
    }
    
    return checkpoint
  })
  
  return updatedCheckpoints
}

// Get all documents for a project (timeline images + uploaded documents)
export const getAllProjectDocuments = (uploadedDocuments, timelineCheckpoints) => {
  const progressImages = syncProgressImagesFromTimeline(timelineCheckpoints)
  
  // Combine uploaded documents with timeline images
  const allDocuments = [
    ...progressImages,
    ...uploadedDocuments.filter(doc => doc.category !== 'progress_images') // Avoid duplicates
  ]
  
  // Sort by upload date (newest first)
  return allDocuments.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
}

// Notification helpers for document sharing
export const notifyHomeownerOfNewDocument = (document, homeowner, project) => {
  const notification = {
    type: 'document_shared',
    title: 'New Document Shared',
    message: `${document.name} has been shared with you for project ${project.name}`,
    documentId: document.id,
    projectId: project.id,
    timestamp: new Date()
  }
  
  if (homeowner.hasAccount) {
    // Send in-app notification
    console.log('In-app notification sent:', notification)
  } else {
    // Send email notification with link
    console.log('Email notification sent to:', homeowner.email, notification)
  }
  
  return notification
}

// Track document viewing for transparency
export const markDocumentAsViewed = (documentId, viewedBy, viewedAt = new Date()) => {
  const viewingRecord = {
    documentId,
    viewedBy,
    viewedAt,
    ipAddress: '192.168.1.1', // Would be actual IP in real app
    userAgent: navigator.userAgent
  }
  
  console.log('Document viewing tracked:', viewingRecord)
  return viewingRecord
}

// Get document statistics for project
export const getDocumentStatistics = (documents) => {
  const stats = {
    total: documents.length,
    byCategory: {},
    totalSize: 0,
    sharedWithHomeowner: 0,
    viewedByHomeowner: 0,
    recentUploads: 0 // Last 7 days
  }
  
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  documents.forEach(doc => {
    // Category stats
    if (!stats.byCategory[doc.category]) {
      stats.byCategory[doc.category] = 0
    }
    stats.byCategory[doc.category]++
    
    // Size stats
    stats.totalSize += doc.size
    
    // Sharing stats
    if (doc.sharedWithHomeowner) {
      stats.sharedWithHomeowner++
      if (doc.homeownerViewed) {
        stats.viewedByHomeowner++
      }
    }
    
    // Recent uploads
    if (doc.uploadedAt > oneWeekAgo) {
      stats.recentUploads++
    }
  })
  
  return stats
}
