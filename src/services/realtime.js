/**
 * Simple Pub/Sub realtime service (in-memory stub)
 * Replace with WebSocket/SSE/Ably/Pusher as needed.
 */

const channelToSubscribers = new Map()

export const subscribe = (channel, handler) => {
  if (!channelToSubscribers.has(channel)) {
    channelToSubscribers.set(channel, new Set())
  }
  const set = channelToSubscribers.get(channel)
  set.add(handler)

  return () => {
    set.delete(handler)
    if (set.size === 0) {
      channelToSubscribers.delete(channel)
    }
  }
}

export const publish = (channel, event) => {
  const set = channelToSubscribers.get(channel)
  if (!set) return
  set.forEach((handler) => {
    try {
      handler(event)
    } catch (_) {
      // no-op
    }
  })
}

export const channels = {
  project: (projectId) => `project:${projectId}`,
  milestones: (projectId) => `project:${projectId}:milestones`,
  documents: (projectId) => `project:${projectId}:documents`,
  messages: (projectId) => `project:${projectId}:messages`,
  notifications: (userId) => `user:${userId}:notifications`,
}


