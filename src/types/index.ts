export type AnonToken = {
  user_id: string;
  created_at: string;
};

type Resource = {
  id: string;
  created_at_timestamp: number;
  created_at_date_string: string;
};

// number mapping based on date.getDay()
export enum WeekDays {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 0,
}

export enum Days {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs",
  REST = "rest",
}

export type WorkoutSchedule = {
  [key in WeekDays]?: Days;
};

export const WorkoutLabels: Partial<
  Record<Days, Record<string, Record<string, string>>>
> = {
  [Days.REST]: {
    "rest day": {
      N_A: ":)",
    },
  },
  [Days.PUSH]: {
    chest: {
      INCLINE_DUMBELL_PRESS: "incline dumbell press",
      MACHINE_CHEST_PRESS: "machine chest press",
      PEC_DEC: "pec dec",
      CABLE_FLY: "cable fly",
      BENCHPRESS: "barbell benchpress",
      PEC_FLY: "pec fly",
      DUMBBELL_BENCH_PRESS: "dumbbell bench press",
      DUMBBELL_FLY: "dumbbell fly",
    },
    shoulders: {
      MACHINE_SHOULDER_PRESS: "machine shoulder press",
      DUMBBELL_FRONT_RAISE: "dumbbell front raise",
      DUMBBELL_LATERAL_RAISE: "dumbbell lateral raise",
      DUMBBELL_SHOULDER_PRESS: "dumbbell shoulder press",
    },
    triceps: {
      TRICEP_ROPE_EXTENSION: "tricep rope extension",
      TRICEP_BAR_EXTENSION: "tricep bar extension",
      MACHINE_ARM_EXTENSION: "machine arm extension",
      CROSS_CABLE_TRICEP_EXTENSION: "cross cable tricep extension",
      OVERHEAD_CABLE_TRICEP_EXTENSION: "overhead cable tricep extension",
      OVERHEAD_DUMBELL_TRICEP_EXTENSION: "overhead dumbell tricep extension",
      KULL_CRUSHERS: "skull crushers",
      TRICEP_KICKBACK: "tricep kickback",
      TRICEP_DIP: "tricep dip",
    },
  },
  [Days.PULL]: {
    back: {
      WIDE_GRIP_LAT_PULLDOWN: "wide grip lat pulldown",
      SEATED_CABLE_ROW: "seated cable row",
      VERTICAL_TRACTION: "vertical traction",
      DEADLIFT: "deadlift",
      PULL_UP: "pull up",
      BENT_OVER_ROW: "bent over row",
      HAMMER_STRENGTH_ROW: "hammer strength row",
      FACE_PULL: "face pull",
      DUMBBELL_ROW: "dumbbell row",
      DUMBBELL_PULLOVER: "dumbbell pullover",
    },
    biceps: {
      BICEP_CURL: "bicep curl",
      ARM_CURL_MACHINE: "arm curl machine",
      HAMMER_CURL: "hammer curl",
      CONCENTRATION_CURL: "concentration curl",
      PREACHER_CURL: "preacher curl",
    },
    traps: {
      BAR_SHRUG: "bar shrug",
      DUMBBELL_SHRUG: "dumbbell shrug",
    },
  },
  [Days.LEGS]: {
    quads: {
      BULGARIAN_SPLIT_SQUAT: "bulgarian split squat",
      BARBELL_SQUAT: "barbell squat",
      GOBLET_SQUAT: "goblet squat",
      DUMBBELL_SQUAT: "dumbbell squat",
      DUMBBELL_LUNGES: "dumbbell lunges",
      DUMBBELL_STEP_UPS: "dumbbell step ups",
      LEG_PRESS: "leg press",
      LEG_EXTENSION: "leg extension",
    },
    hamstrings: {
      DUMBBELL_DEADLIFT: "dumbbell deadlift",
      HAMSTRING_CURL: "hamstring curl",
    },
    thigh: {
      SEATED_THIGH_ADDUCTOR: "seated inner-thigh adductor",
      SEATED_HIP_ABDUCTOR: "seated outer-thigh abductor",
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

export type LoginPostRequest = {
  token: string;
};
