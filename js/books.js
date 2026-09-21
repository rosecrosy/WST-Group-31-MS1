function createBook(formData) {
  return {
    id: crypto.randomUUID(),

    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    genre: formData.get("genre"),
    subgenre: formData.get("subgenre"),
    status: formData.get("status"),
    rating: formData.get("rating"),
    characters: formData.get("characters").trim(),
    lesson: formData.get("lesson").trim(),

    createdAt: new Date().toISOString(),
  };
}