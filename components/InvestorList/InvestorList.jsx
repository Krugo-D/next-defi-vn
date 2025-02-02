import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import investorList from "./InvestorList.json";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InvestorList() {
  const [index, setIndex] = useState(20);
  const [latestInvestorList, setLatestInvestorList] = useState(investorList)
  const [investors, setInvestors] = useState(investorList.slice(0, index));
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { t } = useTranslation("investors");
  const fetchData = () => {
    if (investors.length >= latestInvestorList.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setInvestors(investors.concat(latestInvestorList.slice(index, index + 20)));
      setIndex(index + 20);
    }, 500);
  };


  // a function to use drop down menu to filter services by tag
  const filterInvestorsDropdown = (event) => {
    if (event.target.value === "") {
      setInvestors(investorList.slice(0, index));
      setLatestInvestorList(investorList)
      return;
    }
    let filteredInvestorsList = [];
    filteredInvestorsList = investorList.filter(
      investor => investor.tags.includes(event.target.value) === true
    );
    setLatestInvestorList(filteredInvestorsList)
    setInvestors(filteredInvestorsList.slice(0, index));
  };

  return (
    <>
    <select className="filter-tag" name="investors" id="investors" onChange={filterInvestorsDropdown}>
      <option value="">All</option>
      <option value="vc">Venture capital</option>
      <option value="mm">Market maker</option>
      <option value="seed">Seed</option>
      <option value="vb">Venture builder</option>
      <option value="angel">Angel</option>
      <option value="finance">Financial services</option>
    </select>

    <InfiniteScroll
      dataLength={investors.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>{t("load")}</h4>}
      endMessage={
        <p
          style={{
            marginTop: "50px",
            fontSize: "25px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {t("end")}
        </p>
      }
    >
      <div className="service-box">
        {investors.map((investor) => (
          <div key={investor.id} className="service-item">
            <div className="service-brand-name">
              {investor.name}
            </div>
            <div className="service-desc">
              {investor.desc}
            </div>
            <div className="service-guide">
              {investor.tags.map((tag) => (
                <div key={tag} className="service-badge">{tag}</div>
              ))}
            </div>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              {investor.telegram ? (
                <div>
                  <a href={investor.telegram}>
                    <Image
                      src="/icons8-telegram.svg"
                      alt="Telegram icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.twitter ? (
                <div>
                  <a href={investor.twitter}>
                    <Image
                      src="/icons8-twitter.svg"
                      alt="Twitter icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.discord ? (
                <div>
                  <a href={investor.discord}>
                    <Image
                      src="/icons8-discord.svg"
                      alt="Discord icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.facebook ? (
                <div>
                  <a href={investor.facebook}>
                    <Image
                      src="/icons8-facebook.svg"
                      alt="Facebook icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.linkedin ? (
                <div>
                  <a href={investor.linkedin}>
                    <Image
                      src="/icons8-linkedin.svg"
                      alt="Linkedin icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.youtube ? (
                <div>
                  <a href={investor.youtube}>
                    <Image
                      src="/icons8-youtube.svg"
                      alt="Youtube icon"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              ) : null}
              {investor.email ? (
                <span>
                  <a href={investor.email}>
                    <Image
                      src="/icons8-circled-envelope.svg"
                      alt="Email icon"
                      width={32}
                      height={32}
                    />
                  </a>
                </span>
              ) : null}
            </div>
            <a href={investor.web} target="_blank" style={{ textDecoration: "none", color: "#000000" }}>
              <div className="service-cta">{t("cta")}</div>
            </a>
          </div>
        ))}
      </div>
    </InfiniteScroll>
    </>
  );
}
