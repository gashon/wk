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

export const WorkoutLabels: Partial<
  Record<Days, Record<string, Record<string, string>>>
> = {
  [Days.PUSH]: {
    chest: {
      BENCHPRESS: "benchpress",
      INCLINE_DUMBELL_PRESS: "incline dumbell press",
      PEC_FLY: "pec fly",
      PEC_DEC: "pec dec",
      DUMBBELL_BENCH_PRESS: "dumbbell bench press",
      DUMBBELL_FLY: "dumbbell fly",
    },
    shoulders: {
      DUMBBELL_FRONT_RAISE: "dumbbell front raise",
      SHOULDER_PRESS: "shoulder press",
      DUMBBELL_LATERAL_RAISE: "dumbbell lateral raise",
      DUMBBELL_SHOULDER_PRESS: "dumbbell shoulder press",
    },
    triceps: {
      TRICEP_DIP: "tricep dip",
      OVERHEAD_TRICEP_EXTENSION: "overhead tricep extension",
      TRICEP_EXTENSION: "tricep extension",
      TRICEP_KICKBACK: "tricep kickback",
      SKULL_CRUSHERS: "skull crushers",
    },
  },
  [Days.PULL]: {
    back: {
      DEADLIFT: "deadlift",
      PULL_UP: "pull up",
      BENT_OVER_ROW: "bent over row",
      FACE_PULL: "face pull",
      DUMBBELL_ROW: "dumbbell row",
      LAT_PULLDOWN: "lat pulldown",
      DUMBBELL_PULLOVER: "dumbbell pullover",
    },
    biceps: {
      HAMMER_CURL: "hammer curl",
      BICEP_CURL: "bicep curl",
      DUMBBELL_CURL: "dumbbell curl",
    },
    traps: {
      DUMBBELL_SHRUG: "dumbbell shrug",
    },
  },
  [Days.LEGS]: {
    quads: {
      BULGARIAN_SPLIT_SQUAT: "bulgarian split squat",
      GOBLET_SQUAT: "goblet squat",
      DUMBBELL_SQUAT: "dumbbell squat",
      DUMBBELL_LUNGES: "dumbbell lunges",
      DUMBBELL_STEP_UPS: "dumbbell step ups",
      LEG_PRESS: "leg press",
      LEG_EXTENSION: "leg extension",
    },
    hamstrings: {
      DUMBBELL_DEADLIFT: "dumbbell deadlift",
      LEG_CURL: "leg curl",
    },
    calves: {
      DUMBBELL_CALF_RAISE: "dumbbell calf raise",
      CALF_RAISE: "calf raise",
    },
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

export type WorkoutGetRequest = Partial<{
  start_timestamp: string;
  end_timestamp: string;
}> &
  Pick<Workout, "type">;

export type WorkoutGetResponse = Response<Workout[]>;

export type WorkoutDeleteRequest = Pick<Workout, "id">;

export type BodyWeight = {
  weight: number;
} & Resource;

export type WeightGetRequest = Partial<{
  start_timestamp: string;
  end_timestamp: string;
}>;
export type WeightGetResponse = Response<BodyWeight[]>;

export type WeightPostResponse = Response<BodyWeight>;
export type WeightPostRequest = Pick<
  BodyWeight,
  "weight" | "created_at_timestamp" | "created_at_date_string"
>;

export type WeightDeleteRequest = Pick<BodyWeight, "id">;
export type WeightDeleteResponse = { message: string };

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
