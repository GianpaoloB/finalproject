import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSeasons } from "./actions";
import axios from "./axios";
import SearchbarQueens from "./search_queen.js";
class Dragrace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Online", this.props);
    }
    componentDidMount() {
        fetch("http://www.nokeynoshade.party/api/seasons")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    seasons: result
                });
                console.log("Just set the state", this.state.seasons);
                this.props.dispatch(setSeasons(this.state.seasons));
            });

        // axios.get("/queens/all/secret");
    }
    render() {
        // const handleInput = e => {
        //     this.setState({ [e.target.name]: e.target.value });
        // };
        if (!this.state.seasons) {
            return (
                <section id="modal">
                    <img src="/img/mamaru_waiting_1.gif" />
                </section>
            );
        }

        let regular = [];
        let as = [];
        {
            this.state.seasons &&
                this.state.seasons.map(season => {
                    let eachSeason = "/season/" + season.id;
                    if (isNaN(season.seasonNumber)) {
                        as.push(
                            <div className="season" key={season.id}>
                                <Link to={eachSeason}>
                                    <img src={season.image_url} />
                                    <h4>SEASON {season.seasonNumber}</h4>
                                </Link>
                            </div>
                        );
                    } else {
                        regular.push(
                            <div className="season" key={season.id}>
                                <Link to={eachSeason}>
                                    <img src={season.image_url} />
                                    <h4>SEASON {season.seasonNumber}</h4>
                                </Link>
                            </div>
                        );
                    }
                });
        }
        return (
            <section className="project" id="friendspage">
                <div id="seasons">
                    <h3>
                        SEASONS <SearchbarQueens />
                    </h3>
                    <div className="container">{regular}</div>

                    <h3>ALL STARS EDITION </h3>
                    <div className="container">{as}</div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log("This is the state ", state.seasons);
    return {
        seasons: state.seasons
    };
};

export default connect(mapStateToProps)(Dragrace);
