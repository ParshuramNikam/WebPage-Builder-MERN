import Pages from './page.modal';

export const createPage = async (pageBody) => {
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  pageBody.slug = slug;
  console.log(pageBody);
  const page = new Pages(pageBody);
  const pageResponse = await page.save();
  return pageResponse;
};
export const listPages = async (userId) => {
  // NOTE: here should be or either public: true or _id: userId
  console.log("***** " + userId);
  const pages = await Pages.find({ user: userId });
  return pages;
};
export const deletePage = async (pageId) => { };
export const updatePage = async (pageId, pageBody) => { };
export const pageDetails = async (pageId) => {
  const pages = await Pages.findOne({ _id: pageId });
  return pages;
};
export const savePageContent = async (pageId, content) => {
  const pageUpdated = await Pages.findOneAndUpdate({ _id: pageId }, { content });
  return pageUpdated;
};
export const findPageById = async (pageId) => {
  const page = await Pages.findById(pageId);
  return page;
};