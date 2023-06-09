import { db } from '../utils/db.js';

export const createDirection = async (direction) => {
  return await db.direction.create({
    data: {
      name: direction,
    },
  });
};

export const getAllDirections = async () => {
  return await db.direction.findMany();
};

export const getDirectionById = async (id) => {
  return await db.direction.findUnique({
    where: {
      id,
    },
  });
};

export const updateDirectionById = async (id, direction) => {
  return await db.direction.update({
    where: {
      id,
    },
    data: {
      name: direction,
    },
  });
};

export const deleteDirectionById = async (id) => {
  return await db.direction.delete({
    where: {
      id,
    },
  });
};
