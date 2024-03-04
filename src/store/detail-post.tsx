import { createContext, useContext, useState } from "react";
import { TComment } from "../types";

type TPostDetail = {
  comments: TComment[];
  setComments: React.Dispatch<React.SetStateAction<TComment[]>>;
  isCommentVisible: boolean;
  setIsCommentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  commentButtonText: string;
  setCommentButtonText: React.Dispatch<React.SetStateAction<string>>;
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedComment: TComment | null;
  setSelectedComment: React.Dispatch<React.SetStateAction<TComment | null>>;
};

const PostDetailCtx = createContext<TPostDetail>({
    comments: [],
    setComments: () => { },
    isCommentVisible: false,
    setIsCommentVisible: () => { },
    commentButtonText: "",
    setCommentButtonText: () => { },
    isCommentModalOpen: false,
    setIsCommentModalOpen: () => { },
    selectedComment: null,
    setSelectedComment: () => { },
});

export function PostDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [commentButtonText, setCommentButtonText] = useState("Show Comments");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);

  return (
  <PostDetailCtx.Provider
    value={{
        comments,
        setComments,
        isCommentVisible,
        setIsCommentVisible,
        commentButtonText,
        setCommentButtonText,
        isCommentModalOpen,
        setIsCommentModalOpen,
        selectedComment,
        setSelectedComment
    }}
  >
    {children}
    </PostDetailCtx.Provider>);
}

export function usePostDetailCtx() {
  const postDetailResult = useContext(PostDetailCtx);
  return postDetailResult;
}
