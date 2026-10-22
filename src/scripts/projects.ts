import { type CollectionEntry, getCollection } from "astro:content";

export async function getProjectPosts() {
  let projectPosts: CollectionEntry<"projects">[] =
    await getCollection("projects");
  if (!import.meta.env.DEV) {
    projectPosts = projectPosts.filter((post) => !post.data.draft);
  }

  return projectPosts;
}

export async function getAllTags() {
  const projectPosts = await getProjectPosts();
  const tags = new Set<string>();

  projectPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags);
}

export async function getOrderedTags() {
  const tags = await getAllTags();
  return tags.sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export async function getPostsByTag(tag: string) {
  const projectPosts = await getProjectPosts();
  return projectPosts.filter((post) => post.data.tags.includes(tag));
}

export async function getTagsWithCountPostsByTag() {
  const tags = await getOrderedTags();
  const tagsWithCount = [];

  for (const tag of tags) {
    const postsByTag = await getPostsByTag(tag);
    tagsWithCount.push({
      name: tag,
      postCount: postsByTag.length,
    });
  }

  return tagsWithCount;
}

export async function getMoreTags(limit: number = 10) {
  const tags = await getTagsWithCountPostsByTag();
  return tags.sort((a, b) => b.postCount - a.postCount).slice(0, limit);
}
