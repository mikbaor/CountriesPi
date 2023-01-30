import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsCountries } from "../../redux/action/actions";
import style from "./detail.module.css";
import Card from "../Card/card";
import Load from "../loading/load";

export default function Details() {
  const { id } = useParams();

  
  const dispatch = useDispatch();
  const country = useSelector((state) => state.detailCountry);

  useEffect(() => {
    dispatch(detailsCountries(id));
  }, [dispatch, id]);

 

  return (
    <div className={style.container}>{country ? <Card /> : <Load />}
        
    </div>
  );
}