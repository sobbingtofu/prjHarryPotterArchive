export type CommentList = Comment[]

export interface Comment {
  id: string
  created_at: string
  movie_id: string
  user_id: string
  comment: string
  email: string
  isEditing?: boolean
}
//? 있으면 적용 필수는 아님