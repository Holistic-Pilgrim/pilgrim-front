import { utils } from "near-api-js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import HeaderTop from '../assets/header-top.png';
import HeaderBot from '../assets/header-bot.png';
import imgFrame from '../assets/frame.png';
import imgAdvantages from '../assets/advantages.png';
import {
  useParams
} from "react-router-dom";

const PilgrimDetail = (props) => {
  let { token_id } = useParams();
  if(isNaN(token_id)){
    return "ERR";
  }
  const [ownedNft, setOwnedNft] = React.useState([]);
  const [allNft, setAllNft] = React.useState([]);
  const [metadata, setMetadata] = React.useState([]);
  const [isOwned, setIsOwned] = React.useState(0);
  const [story, setStory] = React.useState()
  const [tempstory, setTempStory] = React.useState()

  React.useEffect(() => {
    get_params();
    get_all_nft();
    get_story();
    
    if (!window.accountId) return;
    get_owned_nft();
  }, [window.accountId]);

  const get_story = async () =>{
    window.contract.get_story({ nft_id: token_id })
      .then(stry => {
        stry = JSON.parse(stry)
        setStory(stry.story)
        setTempStory(stry.story)
      })
  }

  const save_story = async () => {
    await window.contract.set_story({
      // pass the value that the user entered in the greeting field
      story: tempstory,
      nft_id: token_id,
      nft_connection: "[]"
    })

    await alert("success")
  }

  const get_params = async () => {
    fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${token_id}.json`)
    .then(response => response.json())
    .then((jsonData) => {
      setMetadata(jsonData)
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  }

  const get_owned_nft = async () => {
    const owned_nft = await window.contract_nft.nft_tokens_for_owner({ account_id: window.accountId });
    await setOwnedNft([...owned_nft]);
    await setIsOwned(owned_nft.filter(x => x.token_id == token_id ).length)
  };

  const get_all_nft = async () => {
    const all_nft = await window.contract_nft.nft_tokens();
    setAllNft([...all_nft]);
  };

  let lorebox;
  if(isOwned){
    lorebox = (
      <>
        <Form.Control as="textarea" rows={12} onChange={x => setTempStory(x.target.value)} defaultValue={tempstory} />
        <br />
        <Button onClick={save_story}>Save Story</Button>
      </>
      )
  }else{
    lorebox = (
      <p style={{overflowY: "auto", height: "300px", color: "#543927", whiteSpace: "pre-wrap"}}>
        {story}
      </p>
      )
  }

  return (
    <div className="pilgrim py-5">
      <Container>  
        <Row className="pilgrim_detail">
          <Col md={6} xs={6} className="py-3 px-4">
            <Row className="justify-content-md-center">
              <Col md={12} sm={12} className="text-center py-2">
                <img src={HeaderTop} className="img-fluid" />
                  <i style={{fontSize: "25px"}}>{metadata.title}</i>
                <img src={HeaderBot} className="img-fluid" />
              </Col>
              <Col md={7} sm={12} className=" py-2">
                <div className="with_frame"
                style={{background: `url(https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${token_id}.png)`}}
                >
                  <img
                    src={imgFrame}
                    width="100%"
                    style={{ cursor: "pointer" }}
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgAdvantages} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Advantages</b><br/><small>{(metadata.title)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgAdvantages} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Disadvantages</b><br/><small>{(metadata.title)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgAdvantages} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Skills</b><br/><small>{(metadata.title)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgAdvantages} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Pet</b><br/><small>{(metadata.title)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            
          </Col>
          <Col md={6} xs={6} className="py-3 px-4">
            <Row>
              <Col xs={12}>
                <b>Story :</b> <br / >
                  {lorebox}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PilgrimDetail;
