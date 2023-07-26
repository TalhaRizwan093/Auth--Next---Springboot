import React, { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { useMessage } from "../services/use-message";
import { useToken } from "../services/use-token";
import jwt from "jsonwebtoken";
import axios from "axios";

const Protected = () => {
  const apiServerUrl = process.env.API_SERVER_URL;
  const { token } = useToken({
    url: `/api/accessToken/token`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const [userPermissions, setUserPermissions] = useState([]);

  const getMessage = async (token) => {
    try {
      console.log(apiServerUrl);
      const response = await axios({
        url: `http://localhost:6060/api/messages/protected`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      // Decode the JWT token and access its payload to get user information

      const parsedToken = JSON.parse(token);
      const decodedToken = jwt.decode(parsedToken);
      getMessage(parsedToken);
      if (decodedToken && decodedToken.permissions) {
        setUserPermissions(decodedToken.permissions);
      }
    }
  }, [token]);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Protected Message" code={token} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Protected;
