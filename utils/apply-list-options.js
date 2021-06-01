module.exports = (searchFields, query, listOptions) => {
  if (listOptions && searchFields.length && query) {
    const { range, filter, sort, search } = listOptions;
    if (search) {
      searchFields.forEach(field => {
        query = query.orWhere(field, "LIKE", `%${search}%`);
      });
    }
    if (filter && filter.length === 2) {
      query = query.andWhere(filter[0], "=", filter[1]);
    }
    if (sort && sort.length === 2) {
      query = query.orderBy(sort[0], sort[1]);
    }
    if (range && range.length === 2) {
      query = query.range(range[0], range[1]);
    }
  }
  return query;
};
