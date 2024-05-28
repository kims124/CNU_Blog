import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import NotFound from '../../../../cse 3-1/실전코딩/CNU_Blog/src/components/NotFound.tsx';
import Tag from '../../../../cse 3-1/실전코딩/CNU_Blog/src/components/Tag.tsx';
import useGetPostById from '../../../../cse 3-1/실전코딩/CNU_Blog/src/queries/useGetPostById.ts';
import useDeletePostById from '../../../../cse 3-1/실전코딩/CNU_Blog/src/queries/useDeletePostById.ts';

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0px;
  font-weight: 800;
  color: #212529;
  margin-bottom: 2rem;
  word-break: keep-all;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -1.25rem;
`;

const TextButton = styled.button`
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  color: #868e96;
`;

const TagWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;
`;

const Info = styled.div`
  font-size: 1rem;
  color: #495057;
`;

const ContentsArea = styled.div`
  width: 768px;
  margin: 5rem auto 0px;
  font-size: 1.125rem;
  color: #212529;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Text = styled.p`
  width: 700px;
`;

const Post = () => {
  const params = useParams();
  const { postId = '' } = params;
  const { data: post, isError, isLoading } = useGetPostById(postId);
  const { mutate: deletePost } = useDeletePostById();
  const clickDeleteButton = () => {
    const result = window.confirm('정말 삭제하십니까?');
    if (result) {
      deletePost({ postId });
    }
  };
  if (isLoading) {
    return <div>...불어오는중...</div>;
  }
  if (!post || isError) {
    return <NotFound />;
  }

  // todo (4) post 컴포넌트 작성
  return (
    <div style={{ margin: '5.5rem auto', width: '700px' }}>
      <div>
        <Title>{post.title}</Title>
        <Toolbar>
          <Info>
            <div>n분전</div>
          </Info>
          <div>
            {/*todo 수정/삭제 버튼 작성*/}
            <Link to="/write" state={{ postId }}>
              <TextButton style={{ marginRight: 10 }}>수정</TextButton>
            </Link>
            <TextButton onClick={clickDeleteButton}>삭제</TextButton>
          </div>
        </Toolbar>
        {post?.tag && (
          <TagWrapper>
            <Tag>#{post.tag}</Tag>
          </TagWrapper>
        )}
      </div>
      <ContentsArea>
        {post.contents.split('\n').map((text: string, index: number) => (
          <Text key={index}>{text}</Text>
        ))}
      </ContentsArea>
    </div>
  );
};

export default Post;
