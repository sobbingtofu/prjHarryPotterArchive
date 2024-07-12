import React from "react"

import { Comment, CommentList } from "@/types/commets.type"
import supabase from "@/lib/supabase"

interface CommentsProps {
  serial: string
}

const Comments: React.FC<CommentsProps> = ({ serial }) => {
  const [commentList, setCommentList] = React.useState<CommentList>([])
  const formRef = React.useRef<HTMLFormElement>(null)
  // const [isEditing, setIsEditing] = React.useState(false)

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
  // insert할 때 닉네임이 필요가 없고 보여줄 때 id로 가져오
  // 확장성을 생각해서 기능을 넣을 까
  // join 해서 유저 테이블이랑 코멘트 같이 가져오기

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  }

  // insert 성공,, commentList에도 추가해서 useState로 관리하게 하면 리뷰 추가 or 수정 삭제 시 바로 반영되게 할 수 있나?
  // 근데 그럼 state change 인해 preventDefault해도 어차피 새로고침 되지 않나
  // 리랜더링과 새로고침은 다른건가?
  // 새로 고침은 크롬을 껐다가 키는거 예를들면 전역상태 관리한 값 (끄고 켜서 다시 그려짐)
  // 리랜더링 화면을 다시 그리는거
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const comment = formData.get("comment") as string

    const loggedinUser = await getUser()
    if (!loggedinUser) {
      alert("로그인이 필요합니다.")
      return
    }
    if (comment?.trim().length < 10) {
      alert("리뷰를 10글자 이상 작성해주세요")
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
      alert("리뷰 작성 완료")
      const newComment = data as Comment
      setCommentList((prev) => [...prev, newComment])
      formRef.current?.reset()
    }
  }

  // 함수 표현식 상태에서는 id는 모르는 녀석임
  // 따로 타입 지정해줘야함
  const handleDeleteComment = async (user_id: string, comment_id: string) => {
    const loggedinUser = await getUser()
    if (!loggedinUser) {
      alert("로그인이 필요합니다.")
      return
    }
    if (loggedinUser.id !== user_id) {
      alert("본인이 작성한 리뷰만 삭제할 수 있습니다.")
      return
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment_id)
    if (error) {
      console.log(error)
    } else {
      alert("리뷰 삭제 성공")
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
      alert("로그인이 필요합니다.")
      return
    }
    if (loggedinUser.id !== user_id) {
      alert("본인이 작성한 리뷰만 수정할 수 있습니다.")
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
      alert("리뷰를 10글자 이상 작성해주세요")
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
      alert("리뷰 수정 성공")
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
    <div>
      <form
        onSubmit={handleAddComment}
        className="flex flex-col border-2 border-solid border-gray-600"
        ref={formRef}
      >
        <input type="text" placeholder="리뷰를 등록해 주세요" name="comment" />
        <button type="submit">리뷰 등록</button>
      </form>
      <ul>
        {commentList.map((comment: Comment) => {
          return !comment.isEditing ? (
            <li
              key={comment.id}
              className="border-2 border-solid border-gray-600"
            >
              <div className="flex justify-between">
                <div className="flex">
                  <p>{comment.email}</p>
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
                  <div>line</div>
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
            </li>
          ) : (
            <form
              onSubmit={(event) => handleSaveEditedComment(event, comment.id)}
              className="border-2 border-solid border-gray-600"
            >
              <input
                type="text"
                placeholder="리뷰를 등록해 주세요"
                name="comment"
                defaultValue={comment.comment}
              />
              <button type="submit">save</button>
            </form>
          )
        })}
        {/* line div, last-child none */}
      </ul>
    </div>
  )
}

export default Comments
