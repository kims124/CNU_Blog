import PostListItem from '../../../../cse 3-1/실전코딩/CNU_Blog/src/components/PostListItem.tsx';
import NoPostList from '../../../../cse 3-1/실전코딩/CNU_Blog/src/components/NoPostList.tsx';
import useGetPostList from '../../../../cse 3-1/실전코딩/CNU_Blog/src/queries/useGetPostList.ts';

const Home = () => {
  const { data: postList = [], isError, isLoading } = useGetPostList();
  if (isLoading) {
    return <div>..불러오는 중..</div>;
  }
  if (postList.length === 0 || isError) {
    return <NoPostList />;
  }

  return (
    <div>
      {postList.map(item => (
        <PostListItem key={item.id} id={`${item.id}`} title={item.title} contents={item.contents} tag={item.tag} />
      ))}
    </div>
  );
};

export default Home;
