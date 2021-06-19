import styled from 'styled-components'


const VideoWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  background-color: blue;
`

const YoutubeFrame = () => {
  return (
    <VideoWrapper>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/Qriczssk9zM`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube video"
      />
    </VideoWrapper>
  )
}

export default YoutubeFrame
