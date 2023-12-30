export type AnonToken = {
  user_id: string;
  created_at: string;
};

type Resource = {
  id: string;
  created_at_timestamp: number;
  created_at_date_string: string;
};

export enum Days {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs",
  REST = "rest",
}

export const WorkoutLabels: Partial<Record<Days, Record<any, string>>> = {
  [Days.PUSH]: {
    BENCHPRESS: "benchpress",
    INCLINE_DUMBELL_PRESS: "incline dumbell press",
    SHOULDER_PRESS: "shoulder press",
    TRICEP_DIP: "tricep dip",
    OVERHEAD_TRICEP_EXTENSION: "overhead tricep extension",
  },
  [Days.PULL]: {
    DEADLIFT: "deadlift",
    PULL_UP: "pull up",
    BENT_OVER_ROW: "bent over row",
    FACE_PULL: "face pull",
    HAMMER_CURL: "hammer curl",
  },
  [Days.LEGS]: {
    SQUAT: "squat",
    LEG_PRESS: "leg press",
    LUNGES: "lunges",
    LEG_EXTENSION: "leg extension",
    CALF_RAISE: "calf raise",
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

export type WorkoutDeleteRequest = Pick<Workout, "id">;

export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

export type ConvertSnakeToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

export type StorageDayAndTime = {
  timestamp: string;
  workout: Days;
};
