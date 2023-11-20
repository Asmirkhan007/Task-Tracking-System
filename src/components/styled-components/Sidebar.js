    import React from "react";
    import { Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import { AiOutlineRollback } from "react-icons/ai";
    import { BiHomeSmile, BiUser } from "react-icons/bi";
    import { FiSettings, FiShoppingCart } from "react-icons/fi";
    import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
    import "./Sidebar.css";

    const Sidebar = ({ open, onClose }) => {
    return (
        <motion.div
        className={`sidebar ${open ? "open" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        >
        <button className="close-button" onClick={onClose}>
            <AiOutlineRollback />
        </button>
        <ul>
            <li>
            <Link to="#">
                <BiHomeSmile />
                <span>Home</span>
            </Link>
            </li>
            <li>
            <Link to="#">
                <BiUser />
                <span>About</span>
            </Link>
            </li>
            <li>
            <Link to="#">
                <HiOutlineChatBubbleBottomCenterText />
                <span>Contact</span>
            </Link>
            </li>
            <li>
            <Link to="#">
                <FiSettings />
                <span>Settings</span>
            </Link>
            </li>
            <li>
            <Link to="#">
                <FiShoppingCart />
                <span>Shop</span>
            </Link>
            </li>
        </ul>
        </motion.div>
    );
    };

    export default Sidebar;
