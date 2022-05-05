import { utils } from "near-api-js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTop from '../assets/header-top.png';
import HeaderBot from '../assets/header-bot.png';

function Pilgrim() {

  const [ownedNft, setOwnedNft] = React.useState([]);
  const [allNft, setAllNft] = React.useState([]);
  const [allSupply, setAllSupply] = React.useState(0);
  React.useEffect(() => {
    // get_all_nft();
    // Error Gas Limit


    get_total_supply();
    if (!window.accountId) return;
    get_owned_nft();
  }, [window.accountId]);

  const get_owned_nft = async () => {
    const owned_nft = await window.contract_nft.nft_tokens_for_owner({ account_id: window.accountId });
    setOwnedNft([...owned_nft]);
  };

  const get_all_nft = async () => {
    // const all_nft = await window.contract_nft.nft_tokens();
    // setAllNft([...all_nft]);
    // Error Gas Limit
  };

  const get_total_supply = async () => {
    const all_supply = await window.contract_nft.nft_total_supply();
    setAllSupply(all_supply);
    console.log(all_supply)
    // Error Gas Limit
  };

  return (
    <div className="pilgrim py-5">
      <Container className="text-center">
        <img src={HeaderTop} className="img-fluid" />
          <h1>All Pilgrims</h1>
        <img src={HeaderBot} className="img-fluid" />
        <Row className="pt-5">
        {[...Array(Number(allSupply))].slice(0, 18).map((e, i) => {
          return(
            <Col md={2} xs={6} className="py-3">
            <a href={`/pilgrim/${i}`}>
              <img
                src={`https://cloudflare-ipfs.com/ipfs/bafybeicx2okilwtljyac2b5prutqodxkouyvfgysuav6pspoznn2n2qs2i/${i}.png`}
                width="100%"
                style={{ cursor: "pointer" }}
                className="img-fluid"
                
              />
            </a>
          </Col>)
        })}
        </Row>
      </Container>
    </div>
  );
}

export default Pilgrim;
