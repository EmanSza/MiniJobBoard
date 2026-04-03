const isMongoId = (id) => {
    return /^[a-f\d]{24}$/i.test(id);
}

export { isMongoId }