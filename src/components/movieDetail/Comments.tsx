import React from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

import { Comment, CommentList } from "@/types/commets.type"
import supabase from "@/lib/supabase"

interface CommentsProps {
  serial: string
}

const Comments: React.FC<CommentsProps> = ({ serial }) => {
  const [commentList, setCommentList] = React.useState<CommentList>([])
  const formRef = React.useRef<HTMLFormElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    const getCommentList = async () => {
      const { data, error } = await supabase.from("comments").select("*")
      if (error) {
        console.log(error)
      } else {
        setCommentList(data)
      }
    }
    getCommentList()
  }, [])

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  }

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const comment = formData.get("comment") as string

    const loggedinUser = await getUser()
    if (!loggedinUser) {
      Swal.fire({
        text: "로그인이 필요합니다.",
        confirmButtonColor: "#000000",
      })
      router.push("/auth")
      return
    }
    if (comment?.trim().length < 10) {
      Swal.fire({
        text: "리뷰를 10글자 이상 작성해주세요",
        confirmButtonColor: "#000000",
      })
      return
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        email: loggedinUser.email,
        movie_id: serial,
        user_id: loggedinUser.id,
        comment,
      })
      .select()
      .single()
    if (error) {
      console.log(error)
    } else {
      Swal.fire({
        text: "리뷰 작성 완료",
        confirmButtonColor: "#000000",
      })
      const newComment = data as Comment
      setCommentList((prev) => [...prev, newComment])
      formRef.current?.reset()
    }
  }

  const handleDeleteComment = async (user_id: string, comment_id: string) => {
    const loggedinUser = await getUser()
    if (!loggedinUser) {
      Swal.fire({
        text: "로그인이 필요합니다.",
        confirmButtonColor: "#000000",
      })
      router.push("/auth")
      return
    }
    if (loggedinUser.id !== user_id) {
      Swal.fire({
        text: "본인이 작성한 리뷰만 삭제할 수 있습니다.",
        confirmButtonColor: "#000000",
      })
      return
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment_id)
    if (error) {
      console.log(error)
    } else {
      Swal.fire({
        text: "리뷰 삭제 성공",
        confirmButtonColor: "#000000",
      })
      setCommentList(
        commentList.filter((comment) => {
          return comment.id !== comment_id
        })
      )
    }
  }

  const handleChangeToEditing = async (user_id: string, comment_id: string) => {
    const loggedinUser = await getUser()
    if (!loggedinUser) {
      Swal.fire({
        text: "로그인이 필요합니다.",
        confirmButtonColor: "#000000",
      })
      router.push("/auth")
      return
    }
    if (loggedinUser.id !== user_id) {
      Swal.fire({
        text: "본인이 작성한 리뷰만 수정할 수 있습니다.",
        confirmButtonColor: "#000000",
      })
      return
    }

    setCommentList(
      commentList.map((comment) => {
        return comment.id === comment_id
          ? { ...comment, isEditing: !comment.isEditing }
          : comment
      })
    )
  }

  const handleSaveEditedComment = async (
    event: React.FormEvent<HTMLFormElement>,
    comment_id: string
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const comment = formData.get("comment") as string

    if (comment?.trim().length < 10) {
      Swal.fire({
        text: "리뷰를 10글자 이상 작성해주세요",
        confirmButtonColor: "#000000",
      })
      return
    }

    let { data, error } = await supabase
      .from("comments")
      .update({ comment })
      .eq("id", comment_id)
      .select()
      .single()
    if (error) {
      console.log(error)
    } else {
      Swal.fire({
        text: "리뷰 수정 성공",
        confirmButtonColor: "#000000",
      })
      const newComment = data as Comment
      setCommentList(
        commentList.map((comment) => {
          return comment.id === comment_id
            ? { ...newComment, isEditing: !comment.isEditing }
            : comment
        })
      )
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleAddComment}
        className="flex h-[11rem] w-4/5 flex-col rounded-lg bg-[#2B2B2B] px-20 py-8"
        ref={formRef}
      >
        <input
          type="text"
          placeholder="리뷰를 등록해 주세요"
          name="comment"
          className="mb-3 rounded-lg p-1.5 pb-11"
        />
        <button
          type="submit"
          className="rounded-lg border-white bg-black p-1.5 text-sm text-white hover:border"
        >
          리뷰 작성하기
        </button>
      </form>
      <ul className="mt-14 flex w-4/6 flex-col items-center">
        {commentList.map((comment: Comment) => {
          return !comment.isEditing ? (
            <li key={comment.id}>
              <div className="px-8 text-sm text-white">
                <div className="mb-2 flex justify-between">
                  <div className="flex items-center">
                    <p className="mr-2 text-base">{comment.email}</p>
                    <p>{comment.created_at.slice(0, 10)}</p>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => {
                        handleChangeToEditing(comment.user_id, comment.id)
                      }}
                    >
                      edit
                    </button>
                    <div className="mx-3 mt-1 h-4 w-0.5 bg-white"></div>
                    <button
                      onClick={() => {
                        handleDeleteComment(comment.user_id, comment.id)
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
                <div>{comment.comment}</div>
              </div>
              <div className="mx-auto my-8 h-0.5 w-[50rem] bg-[#252525]"></div>
            </li>
          ) : (
            <form
              onSubmit={(event) => handleSaveEditedComment(event, comment.id)}
              className="flex w-[40rem] justify-center"
            >
              <input
                type="text"
                placeholder="리뷰를 등록해 주세요"
                name="comment"
                defaultValue={comment.comment}
                className="h-[4rem] w-[28rem] rounded-lg"
              />
              <button
                type="submit"
                className="ml-2 rounded-lg border-white bg-black p-4 text-white hover:border"
              >
                저장
              </button>
            </form>
          )
        })}
      </ul>
    </div>
  )
}

export default Comments
