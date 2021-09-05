import { exercises } from '../../../common/contstants/exercises';

const isDictionSubexercise = (subexercise) =>
  exercises['diction'].subexercises.find(
    (obj) => obj.name === subexercise || obj.slug === subexercise,
  );

export { isDictionSubexercise };
