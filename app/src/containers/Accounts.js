import React from "react";

import { shorter } from "../utils";

const Accounts = () => {
  return (
    <div class="card m-t2">
      <div class="card-body">
        <h5 className="card-title">Accounts</h5>
        <div class="col py-9">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" class="col-7">
                  Address
                </th>
                <th scope="col">Balance</th>
                <th scope="col">USD Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td class="col-7">
                  {shorter("0x1F8D2668BAaB2B324f61fCf34730BE8e79e8eCCF")}
                </td>
                <td>0.002ETH</td>
                <td>4USD</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td class="col-7">
                  {shorter("0x993c634FBf2d64738Fd967D8c4B61B038C7B7577")}
                </td>
                <td>0.001ETH</td>
                <td>2USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
