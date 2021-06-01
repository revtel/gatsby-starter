import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {navigate, Link} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import useBreakpoint from '../../Hooks/useBreakPoint';
import ReactDelighters from '../../Components/ReactDelighters';

function Landing(props) {
  const [user] = useOutlet('user');
  const [actions] = useOutlet('actions');
  const showLoginModal = useOutletSetter('login-modal');
  const {passBreakpoint} = useBreakpoint(100);

  return (
    <ReactDelighters>
      <NavBar
        hasBorder={passBreakpoint}
        bgColor={passBreakpoint ? 'white' : 'transparent'}
        style={{height: 64}}>
        <h2>RevtelTech</h2>
        <Button type="text">
          <Link to="/products">商品</Link>
        </Button>
        <Button type="text">
          <Link to="/articles">文章</Link>
        </Button>

        <div style={{flex: 1}}></div>
        {user ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button type="text" onClick={() => navigate('/profile')}>
              Profile
            </Button>
          </div>
        ) : (
          <Button onClick={() => showLoginModal(true)}>LOGIN</Button>
        )}
      </NavBar>

      <Wrapper>
        <HeroBannerSection style={{backgroundColor: 'orange'}}>
          <HeroBannerLogo />
          <h2>RevtelTech</h2>
          <p>Subtitle</p>
        </HeroBannerSection>

        <FlexItemSection style={{backgroundColor: '#eee'}}>
          <div className="content">
            <FlexItem>
              <img
                src="/images/revicon_512.png"
                alt="Logo"
                style={{width: 180, height: 180, objectFit: 'contain'}}
              />

              <div className="description">
                <h3>RevtelTech</h3>
                <p>Subtitle</p>
              </div>
            </FlexItem>

            <FlexItem>
              <img
                src="/images/revicon_512.png"
                alt="Logo"
                style={{width: 180, height: 180, objectFit: 'contain'}}
              />

              <div className="description">
                <h3>RevtelTech</h3>
                <p>Subtitle</p>
              </div>
            </FlexItem>
            <FlexItem>
              <img
                src="/images/revicon_512.png"
                alt="Logo"
                style={{width: 180, height: 180, objectFit: 'contain'}}
              />

              <div className="description">
                <h3>RevtelTech</h3>
                <p>Subtitle</p>
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>

        <RowBannerSection
          style={{backgroundColor: '#eff'}}
          className="landing-slide-in-right"
          data-delighter="start:0.5;">
          <div className="content">
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 120, height: 120, objectFit: 'contain'}}
            />
            <div className="description" style={{marginLeft: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <RowBannerSection>
          <div className="content" style={{flexDirection: 'row-reverse'}}>
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 150, height: 150, objectFit: 'contain'}}
            />

            <div className="description" style={{marginRight: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <RowBannerSection>
          <div className="content">
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 150, height: 150, objectFit: 'contain'}}
            />
            <div className="description" style={{marginLeft: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <RowBannerSection>
          <div className="content" style={{flexDirection: 'row-reverse'}}>
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 150, height: 150, objectFit: 'contain'}}
            />

            <div className="description" style={{marginRight: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <RowBannerSection>
          <div className="content">
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 150, height: 150, objectFit: 'contain'}}
            />
            <div className="description" style={{marginLeft: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <RowBannerSection
          style={{backgroundColor: '#eff'}}
          className="landing-slide-in-left"
          data-delighter="start:0.5;">
          <div className="content" style={{flexDirection: 'row-reverse'}}>
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{width: 120, height: 120, objectFit: 'contain'}}
            />
            <div className="description" style={{marginRight: 20}}>
              <h2>RevtelTech</h2>
              <p>Subtitle</p>
            </div>
          </div>
        </RowBannerSection>

        <FlexItemSection
          style={{padding: '100px 40px', backgroundColor: '#eee'}}>
          <h3 style={{textAlign: 'center'}}>RevtelTech @ 2021</h3>

          <div className="content">
            <FlexItem>
              <div className="description">
                <h3>Contact</h3>
                <p>Email: xxx@gmail.com</p>
                <p>Mobile: 0911222333</p>
              </div>
            </FlexItem>

            <FlexItem>
              <div className="description">
                <h3>Downloads</h3>
                <Button>iOS App</Button>
                <Button>Android App</Button>
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>
      </Wrapper>
    </ReactDelighters>
  );
}

function HeroBannerLogo(props) {
  return (
    <StaticImage
      src="../../images/react-icon.png"
      alt="Logo"
      placeholder="blurred"
      layout="fixed"
      width={256}
      height={256}
    />
  );
}

const Wrapper = styled.div`
  & > section {
    position: relative;
    overflow-x: hidden;
  }

  & .landing-slide-in-right {
    opacity: 0;
    transform: translateX(2000px);
    transition: 350ms;
  }

  & .landing-slide-in-right.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }

  & .landing-slide-in-left {
    opacity: 0;
    transform: translateX(-2000px);
    transition: 350ms;
  }

  & .landing-slide-in-left.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const NavBar = styled.div`
  position: fixed;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  left: 0px;
  width: 100vw;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  z-index: 1;
  box-shadow: ${(props) =>
    props.hasBorder
      ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      : 'none'};
  transition: 200ms;
`;

const HeroBannerSection = styled.section`
  padding: 80px;
  min-height: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h2 {
    font-size: 32px;
    color: white;
  }
  & > p {
    font-size: 18px;
    color: #ccc;
  }
`;

const RowBannerSection = styled.section`
  padding: 40px 20px;

  & > .content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > .description {
      display: flex;
      flex-direction: column;
      & > h2 {
        font-size: 32px;
        color: #888;
      }
      & > p {
        font-size: 18px;
        color: #ccc;
      }
    }
  }
`;

const FlexItemSection = styled.section`
  padding: 40px;

  & > .content {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
`;

const FlexItem = styled.div`
  margin: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .description {
    display: flex;
    flex-direction: column;
    & > h3 {
      font-size: 24px;
      color: #888;
    }
    & > p {
      font-size: 18px;
      color: #ccc;
    }
  }
`;

export default Landing;
