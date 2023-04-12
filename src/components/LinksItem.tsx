import { FeedItem } from "@/types";
import Link from "./Link.vue";

export default ({ item }: { item: FeedItem }) => {
  return (
    <Link class="links-feed-item" href={item.url} noIcon={true}>
      <div class="flex flex-row links-feed-div  xl:w-[700px] 2xl:w-[800px]">
        <header class=" basis-1/4 ">{item.name}</header>
        <div class=" hover:text-dark-red basis-1/2">{item.title}</div>
        <footer class="basis-1/4">{formatDate(item.time)}</footer>
      </div>
    </Link>
  );
};
