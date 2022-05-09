import { utils } from "near-api-js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Form } from 'react-bootstrap';
import HeaderTop from '../assets/header-top.png';
import HeaderBot from '../assets/header-bot.png';

import ReactPaginate from 'react-paginate';

function Pilgrim() {

  const [ownedNft, setOwnedNft] = React.useState([]);
  const [allNft, setAllNft] = React.useState([]);
  const [allSupply, setAllSupply] = React.useState(0);

  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);
  const [sorting, setSorting] = React.useState("asc");
  const itemsPerPage = 18;

  React.useEffect(() => {
    // get_all_nft();
    // Error Gas Limit

    get_total_supply();

    if (!window.accountId) return;
    get_owned_nft();
  }, [window.accountId,itemOffset, itemsPerPage]);

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
    filter_pagi(all_supply,sorting,null)
  };

  function filter_pagi(supply,filter,search){
    let arr = ([...Array(Number(supply)).keys()])
    let startOffset = itemOffset;
    let endOffset = itemOffset + itemsPerPage;
    if(filter=="desc"){
      arr = ([...Array(Number(supply)).keys()]).reverse()
    }

    setPageCount(Math.ceil(Number(supply) / itemsPerPage));

    if(search){

      endOffset = 0 + supply;
      startOffset = 0;
      arr = arr.filter(x => x == search)
      setPageCount(1)
    }

    setCurrentItems(arr.slice(startOffset, endOffset));
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % allSupply;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };


  return (
    <div className="pilgrim py-5">
      <Container className="text-center">
        <img src={HeaderTop} className="img-fluid" />
          <h1>All Pilgrims</h1>
        <img src={HeaderBot} className="img-fluid" />
        <Row className="pt-5 justify-content-end">
          <Col md={4} xs={12} className="py-2">
            <Form.Control type="number" placeholder="Search ID" onChange={e => filter_pagi(allSupply,sorting,e.target.value)} />
          </Col>

          <Col md={2} xs={12} className="py-2">
            <Form.Select aria-label="Sort" onChange={e => filter_pagi(allSupply,e.target.value,null)}>
              <option value="asc">ID (asc)</option>
              <option value="desc">ID (desc)</option>
            </Form.Select>
          </Col>
        </Row>
        <Row >
          {currentItems && currentItems.map((e, i) => {
            // console.log(e)
            return(
              <>
                <Col md={2} xs={6} className="py-2">
                  <a href={`/pilgrim/${e}`}>
                    <img
                      src={`/imgs/${e}.png`}
                      width="100%"
                      style={{ cursor: "pointer" }}
                      className="img-fluid"
                      
                    />
                  </a>
                </Col>
              </>)
          })}
        </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
      </Container>
    </div>
  );
}

export default Pilgrim;
