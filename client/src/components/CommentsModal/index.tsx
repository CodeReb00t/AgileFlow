"use client";

import React, { useState } from "react";
import Modal from "@/src/components/Modal";
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
  Comment,
} from "@/src/state/api";
import { Send } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId: number;
  taskTitle: string;
};

const CommentsModal = ({ isOpen, onClose, taskId, taskTitle }: Props) => {
  const { data: comments, isLoading } = useGetCommentsQuery(taskId, {
    skip: !isOpen,
  });
  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await createComment({ text: text.trim(), taskId, userId });
    setText("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name={`Comments — ${taskTitle}`}>
      <div className="flex flex-col gap-4 max-h-[60vh]">
        {/* User selector */}
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-500 dark:text-gray-400">
            Commenting as User ID:
          </label>
          <input
            type="number"
            min={1}
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm dark:border-stroke-dark dark:bg-dark-tertiary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-[120px] max-h-[40vh] pr-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : comments && comments.length > 0 ? (
            comments.map((comment: Comment) => (
              <div
                key={comment.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-stroke-dark dark:bg-dark-tertiary"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {comment.user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {comment.user?.username || `User ${comment.userId}`}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 pl-9">
                  {comment.text}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <p className="text-sm">No comments yet. Be the first!</p>
            </div>
          )}
        </div>

        {/* New comment form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-200 pt-3 dark:border-stroke-dark"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment…"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm dark:border-stroke-dark dark:bg-dark-tertiary dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isPosting || !text.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentsModal;
