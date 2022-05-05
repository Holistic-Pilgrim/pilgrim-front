import { utils } from "near-api-js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import HeaderTop from '../assets/header-top.png';
import HeaderBot from '../assets/header-bot.png';
import imgFrame from '../assets/frame.png';
import imgAdvantages from '../assets/advantages.png';
import imgDisadvantages from '../assets/disadvantages.png';
import imgSkills from '../assets/skills.png';
import imgPets from '../assets/pets.png';
import btnConn from '../assets/btn-conn.png';
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
  const [isEdit, setIsEdit] = React.useState(false);
  const [isEditable, setEditable] = React.useState(1);
  const [story, setStory] = React.useState()
  const [tempstory, setTempStory] = React.useState()
  const [pilgrimConn, setPilgrimConn] = React.useState([])
  const [tempConn, setTempConn] = React.useState([])
  const [conndata0, setConnData0] = React.useState([])
  const [conndata1, setConnData1] = React.useState([])
  const [conndata2, setConnData2] = React.useState([])
  const [conndata3, setConnData3] = React.useState([])

  React.useEffect(() => {
    // get_all_nft();
    get_story();
    get_params(token_id);
    
    if (!window.accountId) return;
    get_owned_nft();
  }, [window.accountId]);

  const get_story = async () =>{
    await window.contract.get_story({ nft_id: token_id })
      .then(stry => {
        if(stry != "Hello"){
          stry = JSON.parse(stry)
          setStory(stry.story)
          setTempStory(stry.story)
          setPilgrimConn(JSON.parse(stry.nft_connection))
          setTempConn(JSON.parse(stry.nft_connection))
          get_conn_params(JSON.parse(stry.nft_connection))
          if(stry.by != "akpiiz.testnet"){
            setEditable(0)
          }
        }else{
          setStory("Hello")
          setTempStory("Hello")
          setPilgrimConn([null,null,null,null])
          setTempConn([null,null,null,null])
          get_conn_params([null,null,null,null])
        }
        // console.log(isEditable)
      })
  }

  const save_story = async () => {
    await window.contract.set_story({
      story: tempstory,
      nft_id: token_id,
      nft_connection: JSON.stringify(tempConn)
    })

    await get_story();
    await alert("success")
    await setIsEdit(false)

  }

  const get_params = async (tokenId) => {
    await fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${tokenId}.json`)
    .then(response => response.json())
    .then(async (jsonData) => {
      await setMetadata(jsonData)

    })
    .catch((error) => {
      console.error(error)
    })
  }

  const get_conn_params = async(arr) =>{

    if(arr[0]>0){
      fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${arr[0]}.json`)
      .then(response => response.json())
      .then((jsonData) => {
        setConnData0(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
    }
    if(arr[1]>0){
      fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${arr[1]}.json`)
      .then(response => response.json())
      .then((jsonData) => {
        setConnData1(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
    }
    if(arr[2]>0){
      fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${arr[2]}.json`)
      .then(response => response.json())
      .then((jsonData) => {
        setConnData2(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
    }
    if(arr[3]>0){
      fetch(`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${arr[3]}.json`)
      .then(response => response.json())
      .then((jsonData) => {
        setConnData3(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }

  const get_owned_nft = async () => {
    const owned_nft = await window.contract_nft.nft_tokens_for_owner({ account_id: window.accountId });
    await setOwnedNft([...owned_nft]);
    if(window.accountId==process.env.OWNER_ADDRESS){
      await setIsOwned(1)
    }else{
      await setIsOwned(owned_nft.filter(x => x.token_id == token_id ).length)
    }
  };

  const get_all_nft = async () => {
    // const all_nft = await window.contract_nft.nft_tokens();
    // setAllNft([...all_nft]);
    // Error Gas Limit
  };

  let lorebox;
  if(isOwned && isEdit){
    lorebox = (
      <>
        <Form.Control as="textarea" rows={12} onChange={x => setTempStory(x.target.value)} defaultValue={tempstory} />
        <br />
      </>
      )
  }else{
    lorebox = (
      <p style={{overflowY: "auto", height: "300px", color: "#543927", whiteSpace: "pre-wrap"}}>
        {story}
      </p>
      )
  }
  const updateConn = async (val,index) => {
    let newArr = [...tempConn];
    newArr[index] = (val=='' ? null : Number(val)) ;

    await setTempConn(newArr)
  }

  function hidechar(val){
    if(typeof val !== "undefined"){
      const val1 = val.slice(0,22);

      return (`${val1} ...`);
    }
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
                      <b style={{color: "#543927"}}>Advantages</b><br/><small>{(metadata?.advantages?.[0].name)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgDisadvantages} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Disadvantages</b><br/><small>{(metadata?.disadvantages?.[0].name)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgSkills} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Skills</b><br/><small>{(metadata?.skills?.[0].name)}</small>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xs={6} className="py-2">
                <div className="with_frame2 py-3 px-4">
                  <Row>
                    <Col xs={3}>
                      <img src={imgPets} className="img-fluid" />
                    </Col>
                    <Col xs={8}>
                      <b style={{color: "#543927"}}>Pet</b><br/><small>{(metadata?.pets?.[0].name)}</small>
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
            <Row className="text-center py-2 justify-content-md-center">
              <Col xs={5} className={`${pilgrimConn?.[0]>0 ? 'btn-conn' : ''} m-2`}>
                {isOwned && isEdit? 
                  <Form.Control type="number" placeholder="Enter ID" defaultValue={pilgrimConn?.[0]} onChange={e => updateConn(e.target.value,0) } />
                :
                  <a href={`/pilgrim/${pilgrimConn?.[0]}`}>
                    {hidechar(conndata0?.title)}          
                  </a>
                }
              </Col>
              <Col xs={5} className={`${pilgrimConn?.[1]>0 ? 'btn-conn' : ''} m-2`}>
                {isOwned && isEdit? 
                  <Form.Control type="number" placeholder="Enter ID" defaultValue={pilgrimConn?.[1]} onChange={e => updateConn(e.target.value,1) } />
                :
                  <a href={`/pilgrim/${pilgrimConn?.[1]}`}>
                    {hidechar(conndata1?.title)}
                  </a>
                }  
              </Col>
              <Col xs={5} className={`${pilgrimConn?.[2]>0 ? 'btn-conn' : ''} m-2`}>
                {isOwned && isEdit? 
                  <Form.Control type="number" placeholder="Enter ID" defaultValue={pilgrimConn?.[2]} onChange={e => updateConn(e.target.value,2) } />
                :
                  <a href={`/pilgrim/${pilgrimConn?.[2]}`}>
                    {hidechar(conndata2?.title)}          
                  </a>
                }     
              </Col>

              <Col xs={5} className={`${pilgrimConn?.[3]>0 ? 'btn-conn' : ''} m-2`}>
                
                {isOwned && isEdit? 
                  <Form.Control type="number" placeholder="Enter ID" defaultValue={pilgrimConn?.[3]} onChange={e => updateConn(e.target.value,3) } />
                :
                  <a href={`/pilgrim/${pilgrimConn?.[3]}`}>
                    {hidechar(conndata3?.title)}          
                  </a>
                }      
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="px-5">
              {isOwned && isEdit ? 
                <Button onClick={save_story}>Save Story</Button>
                : 
                isOwned && isEditable ? <Button onClick={e=>setIsEdit(true)}>Edit</Button> : ""
              }
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PilgrimDetail;
