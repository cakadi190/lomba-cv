export default defineEventHandler(async (event) => {
  return {code: 404, message: 'Data not found!'};
});
