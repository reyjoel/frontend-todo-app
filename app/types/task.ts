export interface Task {
  id: number
  statement: string
  is_completed: boolean
  task_date: string
  priority?: number
  position: number
}