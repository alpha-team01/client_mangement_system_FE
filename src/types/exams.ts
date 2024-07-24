export type ExamType = "MCQ" | "Structured" | "Written" | string;
export type Exams = {
    exam_id: string;
    exam_name: string;
    exam_type: string;
    exam_date: string;
    exam_duration: string;
    exam_status: string;
    exam_subject: string;
    exam_description: string;
    exam_location: string;
    exam_category: ExamType;
    exam_priority: string;
    exam_proctors: [string];
    exam_start_date: string;
    exam_end_date: string;
  }