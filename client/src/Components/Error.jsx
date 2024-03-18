import React from "react";

export default function Error({ msg }) {
  return (
    <div className="alert alert-danger" role="alert">
      {msg}
    </div>
  );
}
