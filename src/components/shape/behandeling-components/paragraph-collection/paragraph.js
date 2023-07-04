import ContentTransformer from 'ui/content-transformer';
import { H3 } from 'ui';

import { Outer, Title, Body, Text, Media } from './styles';
import Images from '../images';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H3
}) => {
  return (
    <Outer>
      <Text>
        {!!title && title.text && (
          <Title>
            <HeadingComponent>{title.text}</HeadingComponent>
          </Title>
        )}
        {body?.json?.length > 0 && (
          <Body>
            <ContentTransformer {...body.json} />
          </Body>
        )}
      </Text>
      <Media>
        <Images images={images} />
      </Media>
    </Outer>
  );
};

export default Paragraph;
