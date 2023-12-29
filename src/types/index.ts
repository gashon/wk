export type AnonToken = {
  user_id: string;
  created_at: string;
};

type Resource = {
  id: string;
  created_at_timestamp: number;
  created_at_date_string: number;
};

enum Days {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs",
}

export const WorkoutLabel = {
  [Days.PUSH]: {
    BENCHPRESS: "Benchpress",
    INCLINE_DUMBELL_PRESS: "Incline Dumbell Press",
    SHOULDER_PRESS: "Shoulder Press",
    TRICEP_DIP: "Tricep Dip",
    OVERHEAD_TRICEP_EXTENSION: "Overhead Tricep Extension",
  },
  [Days.PULL]: {
    DEADLIFT: "Deadlift",
    PULL_UP: "Pull Up",
    BENT_OVER_ROW: "Bent Over Row",
    FACE_PULL: "Face Pull",
    HAMMER_CURL: "Hammer Curl",
  },
  [Days.LEGS]: {
    SQUAT: "Squat",
    LEG_PRESS: "Leg Press",
    LUNGES: "Lunges",
    LEG_EXTENSION: "Leg Extension",
    CALF_RAISE: "Calf Raise",
  },
};

export type Workout = {
  type: Days;
  label: string;
  repititions: number;
  weight: number;
} & Resource;

export type Response<T> = { data: T };

export type WorkoutPostRequest = Pick<
  Workout,
  | "type"
  | "label"
  | "repititions"
  | "weight"
  | "created_at_timestamp"
  | "created_at_date_string"
>;

export type WorkoutPostResponse = Response<Workout>;

export type WorkoutGetRequest = Pick<Workout, "type">;

export type WorkoutGetResponse = Response<Workout[]>;
