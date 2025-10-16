import { create } from 'zustand';

export const useChatStore = create<ChatState>((set) => ({

  selfId: null,
  conversations: [],
  activeUser: null,
  activeConversationId: null,
  typingUsers: {},

  setSelfId: (id) => set({ selfId: id }),

  setConversations: (convs) => set({ conversations: convs }),

  setActiveUser: (user) => set({ activeUser: user }),

  // Add message
  addMessage: (msg) =>
    set((state) => {
      const { from, to } = msg;
      const selfId = state.selfId ?? null;

      // conversationId is the "other" user in the conversation
      const conversationId = selfId && from === selfId ? to : from;

      const isFromSelf = selfId !== null && from === selfId;
      const activeConv = state.activeConversationId;

      // copy conversations (immutable)
      const updated = state.conversations.slice();
      const idx = updated.findIndex((c) => c.userId === conversationId);

      if (idx >= 0) {
        const conv = updated[idx];
        // append message immutably
        const newMessages = [...conv.messages, msg];

        // increment unread only for incoming messages when conversation not active
        const shouldIncUnread = !isFromSelf && activeConv !== conversationId;
        updated[idx] = {
          ...conv,
          messages: newMessages,
          unreadCount: conv.unreadCount + (shouldIncUnread ? 1 : 0),
        };
      } else {
        // create new conversation
        const unread = !isFromSelf && activeConv !== conversationId ? 1 : 0;
        updated.push({
          userId: conversationId,
          unreadCount: unread,
          messages: [msg],
        });
      }

      return { conversations: updated };
    }),

  //Update Message Status
  updateMessageStatus: (id, status) =>
    set((s) => ({
      conversations: s.conversations.map((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === id ? { ...m, status } : m
        ),
      })),
    })),

  //Delete Messages
  deleteMessage: (messageId) =>
    set((state) => {
      const updatedConversations = state.conversations.map((conv) => {
        return {
          ...conv,
          messages: conv.messages.filter((msg) => msg.id !== messageId),
        };
      });

      return { conversations: updatedConversations };
    }),


  //Replace Message
  replaceMessage: (id, newData) =>
    set((s) => ({
      conversations: s.conversations.map((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === id ? { ...m, ...newData } : m
        ),
      })),
    })),

  setTyping: (userId, isTyping) =>
    set((s) => ({ typingUsers: { ...s.typingUsers, [userId]: isTyping } })),

  resetUnread: (userId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.userId === userId ? { ...c, unreadCount: 0 } : c
      ),
    })),

  // opening a conversation clears its unread count
  setActiveConversation: (userId) =>
    set((state) => ({
      activeConversationId: userId,
      conversations: state.conversations.map((c) =>
        c.userId === userId ? { ...c, unreadCount: 0 } : c
      ),
    })),

  reset: () =>
    set({
      selfId: null,
      conversations: [],
      activeUser: null,
      activeConversationId: null,
      typingUsers: {},
    }),
}));
