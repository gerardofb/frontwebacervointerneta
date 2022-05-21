import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import qs from "qs"
import Parallax from 'react-springy-parallax'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faList,
  faTh,
  faDollarSign,
  faSortAmountDown,
  faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import {
  CardGrid,
  Controls,
  Toggle,
  NoResults
} from "./Components"
import Card from "./Card"
import { Contents } from "../BaseComponents"
import videos from "../videosCategorized"
import { HomeFooter } from "../../HomeFooter"

const defaultState = {
  filter: "",
  display: "grid",
  sort: "ascending"
}

const sortByVideoCount = (videoKeys, sort) => {
  if (sort === "ascending") {
    return [...videoKeys].sort((a, b) => {
      if (videos[a].length < videos[b].length) return -1
      else if (videos[b].length < videos[a].length) return 1
      else return 0
    })
  } else {
    return [...videoKeys].sort((a, b) => {
      if (videos[a].length > videos[b].length) return -1
      else if (videos[b].length > videos[a].length) return 1
      else return 0
    })
  }
}
const url = (name, wrap = false) => `${wrap ? 'url(' : ''}images/${name}.svg${wrap ? ')' : ''}`

const urljpg = (name, wrap = false) => `${wrap ? 'url(' : ''}/images/${name}.jpg${wrap ? ')' : ''}`

class IndexPage extends Component {
  static propTypes = {}

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  navigate = set => {
    this.props.history.push({
      pathname: `/${set.replace(/\s/g, "-")}`,
      search: this.props.location.search
    })
  }

  render() {
    const focusedSet = this.props.location.pathname.split(/\//g)[1]

    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }

    const visibleVideoSets = sortByVideoCount(
      Object.keys(videos),
      queryParamState.sort
    ).filter(set =>
      queryParamState.filter
        ? set.match(new RegExp("^" + queryParamState.filter))
        : true
    )
    return (
      <Parallax
      style={{backgroundColor:"#274546"}}
      ref={ref=> this.parallax = ref}
      pages={2}
      scrolling={true}>
      <div style={{backgroundColor:"#274546", paddingBottom:'7%'}}>
       
              <Parallax.Layer
                    
                    offset={0} speed={1} factor={4}
                    style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }}
                ></Parallax.Layer>
                 <Parallax.Layer offset={0.1} speed={1} style={{backgroundColor:'#c2dcdd',backgroundImage: url('stars', true), backgroundSize: 'cover'}} />
                 <Parallax.Layer offset={0.6} speed={2} style={{backgroundColor:'#a1c9cb', backgroundImage: url('stars', true), backgroundSize: 'cover'}} />
                 <Parallax.Layer offset={0.9} speed={2} style={{backgroundColor:'#5fa3a7', backgroundImage: url('stars', true), backgroundSize: 'cover'}} />
                 <Parallax.Layer offset={1} speed={1} style={{backgroundColor:'#274546', backgroundImage: url('stars', true), backgroundSize: 'cover'}} />
        <Parallax.Layer offset={0.1} speed={0}>   
        <Contents>
          <Controls>
            <div>
              <Toggle
                active={queryParamState.sort === "ascending"}
                onClick={() => this.updateQueryParam({ sort: "ascending" })}
              >
                <FontAwesomeIcon icon={faDollarSign} />
                <FontAwesomeIcon icon={faSortAmountUp} />
              </Toggle>
              <Toggle
                active={queryParamState.sort === "descending"}
                onClick={() => this.updateQueryParam({ sort: "descending" })}
              >
                <FontAwesomeIcon icon={faDollarSign} />
                <FontAwesomeIcon icon={faSortAmountDown} />
              </Toggle>
            </div>
            <div>
              <Toggle
                active={queryParamState.display === "list"}
                onClick={() => this.updateQueryParam({ display: "list" })}
              >
                <FontAwesomeIcon icon={faList} />
              </Toggle>
              <Toggle
                active={queryParamState.display === "grid"}
                onClick={() => this.updateQueryParam({ display: "grid" })}
              >
                <FontAwesomeIcon icon={faTh} />
              </Toggle>
            </div>
          </Controls>
          {visibleVideoSets.length === 0 ? (
            <NoResults>No Results Found</NoResults>
          ) : (
            <CardGrid
              display={queryParamState.display}
              ref={el => (this.cardGrid = el)}
            >
              {visibleVideoSets.map(set => {
                if (set === focusedSet) return <li key={set} />
                return (
                  <Card
                    key={set}
                    setKey={set}
                    videos={videos[set]}
                    videoCount={videos[set].length}
                    navigate={this.navigate}
                  />
                )
              })}
            </CardGrid>
          )}
        </Contents>
        </Parallax.Layer>
        </div>
        <Parallax.Layer offset={1.2} speed={0} style={{display:'flex'}}>
                      <HomeFooter></HomeFooter>
                  </Parallax.Layer>
        </Parallax>
    )
  }
}

export default withRouter(IndexPage)