import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "browser-history";
import Globe from "./components/Globe";
import "leaflet/dist/leaflet.css";
import "./App.css";
import "./components/LayoutMain.scss";
import WelcomeToCity from "./components/WelcomeToCity";
import CircleMenu from "./components/CircleMenu";
import Learn from "./components/learn/Learn";
import Explore from "./components/explore/Explore";
import Spotify from "./components/spotify/Spotify";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Edit from "./components/Edit";
import MyRoom from "./components/MyRoom";
import TranslationQuiz from "./components/learn/TranslationQuiz";
import CityQuiz from "./components/explore/CityQuiz";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
export default function App(props) {
  const [city, setCity] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const localUser = localStorage.getItem("email");
    const localToken = localStorage.getItem("token");
    const localId = localStorage.getItem("userId");
    if (localUser && localToken && localId) {
      setUser(localUser);
      setToken(localToken);
      setUserId(localId);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setToken(null);
    setUserId(null);
  };
  return (
    <Router history={history}>
      <div>
        <CircleMenu logout={logout} user={user} />
      </div>
      <div class="top">
        <div class="vagary-logo"></div>
        <div class="nav-right-side">
          <div class="spotify">
            <Spotify city={city} />
          </div>
          <div class="share">
            <TwitterShareButton
              url={window.location.href}
              hashtags={["vagary"]}
              className="share-button"
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <FacebookShareButton
              url={window.location.href}
              hashtag="#vagary"
              className="share-button"
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
        </div>
      </div>
      <div>
        <Switch>
          <Route
            path="/sign-in"
            component={() => (
              <SignIn
                setUser={setUser}
                setToken={setToken}
                setUserId={setUserId}
              />
            )}
          />
          <Route
            path="/sign-up"
            component={() => (
              <SignUp
                setUser={setUser}
                setToken={setToken}
                setUserId={setUserId}
              />
            )}
          />
          <Route
            path="/edit"
            component={() => (
              <Edit
                setUser={setUser}
                setToken={setToken}
                setUserId={setUserId}
              />
            )}
          />
          <Route
            path="/my-room"
            component={() => (
              <MyRoom user={user} token={token} userId={userId} />
            )}
          />
          <Route path="/city" component={City} />:
          <Route path="/learn" component={Learn} />
          <Route path="/explore" component={Explore} />
          <Route path="/translationquiz" component={TranslationQuiz} />
          <Route path="/cityquiz" component={CityQuiz} />
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Globe {...routeProps} city={city} setCity={setCity} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
function City(props) {
  const city = props.location.state.city.marker.cityName;
  const coordinates = props.location.state.city.marker.coordinates;
  const language = props.location.state.city.marker.language;
  const city_id = props.location.state.city.marker.city_id;
  const userId = props.location.state.city.userData.userId;
  return (
    <div className={`background--${city}`}>
      <WelcomeToCity
        city={city}
        coordinates={coordinates}
        language={language}
        city_id={city_id}
        userId={userId}
      />
    </div>
  );
}
