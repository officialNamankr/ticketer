import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //we are on the server and request should be made to http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //we are on the browser and the requests can be made to base url
    return axios.create({
      baseURL: "/",
    });
  }
};
