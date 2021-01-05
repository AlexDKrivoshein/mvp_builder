/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";
import {Dropdown} from "react-bootstrap";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useLang, setLanguage} from "../../../../i18n";
import {DropdownTopbarItemToggler} from "../../../../_partials/dropdowns";
import {useSelector} from "react-redux";
import axios from "../../../../../app/utils/axios";
import {useHistory} from "react-router-dom";

/*const languages = [
  {
    lang: "en",
    name: "English",
    flag: toAbsoluteUrl("/media/svg/flags/226-united-states.svg"),
  },
  {
    lang: "zh",
    name: "Mandarin",
    flag: toAbsoluteUrl("/media/svg/flags/015-china.svg"),
  },
  {
    lang: "es",
    name: "Spanish",
    flag: toAbsoluteUrl("/media/svg/flags/128-spain.svg"),
  },
  {
    lang: "ja",
    name: "Japanese",
    flag: toAbsoluteUrl("/media/svg/flags/063-japan.svg"),
  },
  {
    lang: "de",
    name: "German",
    flag: toAbsoluteUrl("/media/svg/flags/162-germany.svg"),
  },
  {
    lang: "fr",
    name: "French",
    flag: toAbsoluteUrl("/media/svg/flags/195-france.svg"),
  },
];*/

export function LanguageSelectorDropdown() {
    const lang = useLang();
    const languages = useSelector(({languages}) => languages);
    const currentLanguage = languages.find((x) => x.memo.toLowerCase() === lang);

    const history = useHistory();

    const languageSelected = async (language) => {
        try {
            await axios.post('set_language', {language_id: language.id});
            setLanguage(language.memo.toLowerCase());
            history.push('/');
        } catch (e) {
        }
    }
    return (
        <Dropdown drop="down" alignRight>
            <Dropdown.Toggle
                as={DropdownTopbarItemToggler}
                id="dropdown-toggle-my-cart"
            >
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="language-panel-tooltip">Select Language</Tooltip>
                    }
                >
                    <div className="btn btn-icon btn-hover-transparent-white btn-dropdown btn-lg mr-1">
                        {/*<img
                            className="h-20px w-20px rounded-sm"
                            src={currentLanguage.flag}
                            alt={currentLanguage.name}
                        />*/}
                        {currentLanguage.memo}
                    </div>
                </OverlayTrigger>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
                <ul className="navi navi-hover py-4">
                    {languages.map((language) => (
                        <li
                            key={language.memo}
                            className={clsx("navi-item", {
                                active: language.memo === currentLanguage.memo,
                            })}
                        >
                            <a
                                href="#"
                                onClick={() => languageSelected(language)}
                                className="navi-link"
                            >
                                {/*<span className="symbol symbol-20 mr-3">
                  <img src={language.flag} alt={language.name}/>
                </span>*/}
                                <span className="navi-text">{language.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}
