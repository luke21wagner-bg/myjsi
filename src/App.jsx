import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

//
// ─── INLINED CSS ───────────────────────────────────────────────────────────────
//
const appStyles = `
/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL & CONTAINER
───────────────────────────────────────────────────────────────────────────── */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body,
#root {
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

/* This wrapper matches the outermost <div> on your live site */
.app-container {
  max-width: 420px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden; /* Root is fixed; inner pages scroll individually */
  background-color: #f5f5f5;
}

.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ─────────────────────────────────────────────────────────────────────────────
   TOPBAR (shared by Home, Orders, Sales, etc.)
───────────────────────────────────────────────────────────────────────────── */
.topbar {
  background-color: #333333;  /* same grey as before */
  color: #ffffff;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  z-index: 5;
}

/* Logo image in top-left */
.logo {
  height: 40px;        /* make the logo 40px tall */
  object-fit: contain; /* maintain aspect ratio */
  margin-right: 16px;  /* spacing from right */
  cursor: pointer;     /* clickable pointer */
}

.profile {
  margin-left: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #666666;
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODAL / OVERLAYS (Sales modal, Feedback overlay)
───────────────────────────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: #ffffff;
  width: 90%;
  max-width: 380px;
  max-height: 90%;
  overflow-y: auto;
  border-radius: 8px;
  padding: 16px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 24px;
  color: #555555;
  cursor: pointer;
}

/* ─────────────────────────────────────────────────────────────────────────────
   HOME SCREEN (scrollable grid + feedback bar)
───────────────────────────────────────────────────────────────────────────── */
.home-content {
  flex: 1;
  overflow-y: auto;
  padding-top: 8px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;      /* reduced spacing between tiles */
  padding: 8px;  /* reduced outer padding */
  margin-bottom: 8px;
}
.tile {
  background: linear-gradient(135deg, #c4b5a0 0%, #e0d6c5 100%);
  border-radius: 24px;
  aspect-ratio: 1 / 1; /* Keep tiles perfectly square */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  overflow: hidden;
  transition: background 0.3s ease, transform 0.15s ease;
}
.tile:hover {
  background: linear-gradient(135deg, #d0bea6 0%, #f0e6d5 100%);
  transform: scale(1.02);
}
.tile:active {
  transform: scale(0.98);
}
.tile-icon {
  width: 56px;   /* increased icon size */
  height: 56px;
  margin-bottom: 8px;
}
.tile-icon svg {
  width: 100%;
  height: 100%;
}
.tile-label {
  text-transform: uppercase;
  font-size: 14px; /* increased label size */
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
}
.feedback-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: #c4b5a0;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  z-index: 10;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-transform: uppercase;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ORDERS PAGE
───────────────────────────────────────────────────────────────────────────── */
.orders-toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
}
.orders-search-wrapper {
  position: relative;
  flex: 1;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
}
.orders-search-input {
  width: 100%;
  padding: 8px 8px 8px 36px; /* Leave room for the search icon */
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.orders-search-input:focus {
  border-color: #888888;
}
.orders-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.orders-date {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  text-transform: uppercase;
}
.orders-list {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
}
.orders-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #eeeeee;
}
.orders-item:last-child {
  border-bottom: none;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SALES PAGE
───────────────────────────────────────────────────────────────────────────── */
.sales-toolbar {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  gap: 12px;
  padding: 12px 16px;
  background-color: #ffffff;
}
.sales-toolbar::-webkit-scrollbar {
  display: none;
}
.new-lead-btn,
.rewards-btn,
.commissions-btn,
.opportunities-btn {
  flex: 0 0 auto;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  min-width: 100px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.new-lead-btn:hover,
.rewards-btn:hover,
.commissions-btn:hover,
.opportunities-btn:hover {
  background-color: #555555;
}
.new-lead-btn:active,
.rewards-btn:active,
.commissions-btn:active,
.opportunities-btn:active {
  transform: scale(0.98);
}
.content-page {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 16px;
}
.table-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 16px;
}
.sales-table {
  width: 100%;
  border-collapse: collapse;
}
.sales-table th,
.sales-table td {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
}
.sales-table th {
  background-color: #f0f0f0;
  color: #333333;
  text-transform: uppercase;
  font-weight: normal;
}
.sales-table td {
  color: #555555;
}
.sales-table tr:nth-child(even) {
  background-color: #fafafa;
}
.sales-table tr:last-child td {
  border-bottom: none;
}
.goal-section {
  background-color: #eeeeee;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.goal-label,
.goal-amount {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}
.progress-bar-container {
  background-color: #dddddd;
  border-radius: 10px;
  height: 24px;
  overflow: hidden;
  position: relative;
}
.progress-bar-fill {
  background-color: #333333;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
  white-space: nowrap;
}
.year-progress-text {
  font-size: 12px;
  color: #555555;
  margin-top: 4px;
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENTS-STYLE HEADING (Re-used on multiple pages)
───────────────────────────────────────────────────────────────────────────── */
.documents-heading,
.new-lead-heading,
.rewards-heading,
.com-heading,
.feedback-heading {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  -webkit-text-stroke: 1px #333333;
  margin: 20px 16px 24px;
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENTS BUTTONS (used on Documents & other pages)
───────────────────────────────────────────────────────────────────────────── */
.doc-btn {
  width: 100%;
  background-color: #c4b5a0;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.doc-btn:hover {
  background-color: #b8a38e;
}
.doc-btn:active {
  transform: scale(0.98);
}

/* ─────────────────────────────────────────────────────────────────────────────
   NEW LEAD PAGE
───────────────────────────────────────────────────────────────────────────── */
.new-lead-page .content-page {
  background-color: #ffffff;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.new-lead-heading {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  -webkit-text-stroke: 1px #333333;
  margin: 20px 16px 24px;
}
.new-lead-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.lead-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lead-field label {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.lead-field input[type="text"],
.lead-field input[type="number"],
.lead-field select,
.lead-field textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  outline: none;
  background-color: #fcfcfc;
  transition: border-color 0.2s ease;
}
.lead-field input:focus,
.lead-field select:focus,
.lead-field textarea:focus {
  border-color: #888888;
}
.lead-form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.lead-half {
  flex: 1 1 48%;
}
.lead-full {
  flex: 1 1 100%;
}
.lead-submit-btn {
  background-color: #c4b5a0;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 8px;
}
.lead-submit-btn:hover {
  background-color: #b8a38e;
}
.lead-submit-btn:active {
  transform: scale(0.98);
}

/* ─────────────────────────────────────────────────────────────────────────────
   OPPORTUNITIES PAGE
───────────────────────────────────────────────────────────────────────────── */
.opp-page {
  /* no extra container styles; uses default .content-page when inside modal */
}
.opp-section {
  background-color: #eeeeee;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.opp-section h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
}
.opp-list {
  list-style: none;
  padding-left: 0;
}
.opp-item {
  padding: 6px 0;
  font-size: 14px;
  color: #555555;
  border-bottom: 1px solid #dddddd;
}
.opp-item:last-child {
  border-bottom: none;
}

/* ─────────────────────────────────────────────────────────────────────────────
   REWARDS PAGE
───────────────────────────────────────────────────────────────────────────── */
.rewards-page .content-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.quarter-selector {
  margin: 0 16px 16px;
}
.quarter-selector select {
  width: 100%;
  max-width: 200px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.rewards-section {
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.rewards-section h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}
.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rewards-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555555;
  padding: 4px 0;
  border-bottom: 1px solid #dddddd;
}
.rewards-item:last-child {
  border-bottom: none;
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENTS PAGE (unchanged)
───────────────────────────────────────────────────────────────────────────── */
/* Uses .page, .topbar, .documents-heading, .content-page, .doc-btn */

/* ─────────────────────────────────────────────────────────────────────────────
   COM YDG REQUEST PAGE
───────────────────────────────────────────────────────────────────────────── */
.com-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.com-heading {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  -webkit-text-stroke: 1px #333333;
  margin: 20px 16px 24px;
}
.com-search-wrapper {
  position: relative;
  margin-bottom: 16px;
}
.com-search-input {
  width: 100%;
  padding: 8px 40px 8px 12px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.com-search-input:focus {
  border-color: #888888;
}
.com-search-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: #888888;
  stroke: none;
  cursor: pointer;
}
.model-pill {
  background-color: #c4b5a0;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 16px;
  cursor: pointer;
}
.com-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.com-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.com-item-header {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}
.com-item-fields {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.com-item-fields input {
  flex: 1 1 48%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.com-item-fields input:focus {
  border-color: #888888;
}
.com-submit-btn {
  background-color: #c4b5a0;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: auto;
}
.com-submit-btn:disabled {
  background-color: #dddddd;
  color: #aaaaaa;
  cursor: default;
}
.com-submit-btn:hover:enabled {
  background-color: #b8a38e;
}
.com-submit-btn:active:enabled {
  transform: scale(0.98);
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTS PAGE
───────────────────────────────────────────────────────────────────────────── */
.products-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.category-box {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.category-box:hover {
  background-color: #f0f0f0;
}
.category-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}
.product-images {
  display: flex;
  gap: 8px;
}
.product-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.prod-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
.prod-btn {
  flex: 1 1 48%;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.prod-btn:hover {
  background-color: #f0f0f0;
}
.prod-btn:active {
  transform: scale(0.98);
}
.prod-btn-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.prod-btn-label {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}

/* ─────────────────────────────────────────────────────────────────────────────
   REPLACEMENTS PAGE
───────────────────────────────────────────────────────────────────────────── */
.replacements-page .content-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.upload-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.image-preview {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.form-container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
.form-field label {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.form-field input,
.form-field textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.form-field input:focus,
.form-field textarea:focus {
  border-color: #888888;
}
.submit-btn {
  background-color: #c4b5a0;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.submit-btn:hover {
  background-color: #b8a38e;
}
.submit-btn:active {
  transform: scale(0.98);
}
.action-btn {
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.action-btn:hover {
  background-color: #555555;
}
.action-btn:active {
  transform: scale(0.98);
}

/* ─────────────────────────────────────────────────────────────────────────────
   SSA PAGE
───────────────────────────────────────────────────────────────────────────── */
.ssa-page .content-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.ssa-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ssa-form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ssa-form-field label {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.ssa-form-field input[type="text"],
.ssa-form-field input[type="date"],
.ssa-form-field input[type="number"],
.ssa-form-field select,
.ssa-form-field textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}
.ssa-form-field input:focus,
.ssa-form-field select:focus,
.ssa-form-field textarea:focus {
  border-color: #888888;
}
.ssa-search-wrapper {
  position: relative;
}
.ssa-search-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  stroke: #888888;
  fill: none;
  pointer-events: none;
}
.ssa-search-wrapper input {
  padding-left: 32px;
}
.ssa-dollar-wrapper {
  position: relative;
}
.ssa-dollar-sign {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #555555;
  pointer-events: none;
}
.ssa-dollar-wrapper input {
  padding-left: 24px;
}
.ssa-form-field-inline {
  display: flex;
  gap: 16px;
}
.ssa-checkbox-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.waiver-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.waive-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.ssa-form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.ssa-submit-btn {
  background-color: #c4b5a0;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.ssa-submit-btn:hover {
  background-color: #b8a38e;
}
.ssa-submit-btn:active {
  transform: scale(0.98);
}

/* ─────────────────────────────────────────────────────────────────────────────
   SAMPLES PAGE
───────────────────────────────────────────────────────────────────────────── */
.samples-page .content-page {
  background-color: #f5f5f5;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
}
.dashboard-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEEDBACK PAGE
───────────────────────────────────────────────────────────────────────────── */
.feedback-page .content-page {
  background-color: #ffffff;
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

/* Any additional CSS rules for other pages remain unchanged */
`;
//
// ─── REUSABLE LOGO COMPONENT ─────────────────────────────────────────────────
//
function Logo() {
  // We assume you've placed "MyJSI App Icon.png" into public/
  return (
    <Link to="/">
      <img
        src="/MyJSI App Icon.png"
        alt="My JSI Logo"
        className="logo"
      />
    </Link>
  );
}

//
// ─── SHARED TOPBAR ─────────────────────────────────────────────────────────────
//
function Topbar() {
  return (
    <header className="topbar">
      <Logo />
      <div className="profile" />
    </header>
  );
}

//
// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
//
function HomePage() {
  const apps = [
    {
      name: "orders",
      slug: "orders",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
          <path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/>
        </svg>
      `
    },
    {
      name: "sales",
      slug: "sales",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="white"/>
          <rect x="5" y="8" width="6" height="3" fill="#c4b5a0"/>
          <circle cx="15" cy="12" r="2" fill="#c4b5a0"/>
        </svg>
      `
    },
    {
      name: "lead times",
      slug: "lead-times",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" fill="none"/>
          <path d="M12 7V12L16 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 4L16 4" stroke="white" stroke-width="1.5"/>
          <path d="M4 8L4 16" stroke="white" stroke-width="1.5"/>
        </svg>
      `
    },
    {
      name: "fabrics",
      slug: "fabrics",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
          <path d="M8 8L16 16M16 8L8 16" stroke="white" stroke-width="1.5"/>
          <circle cx="8" cy="8" r="1" fill="white"/>
          <circle cx="16" cy="8" r="1" fill="white"/>
          <circle cx="8" cy="16" r="1" fill="white"/>
          <circle cx="16" cy="16" r="1" fill="white"/>
        </svg>
      `
    },
    {
      name: "products",
      slug: "products",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <rect x="7" y="7" width="4" height="4" fill="white"/>
          <rect x="13" y="7" width="4" height="4" fill="white"/>
          <rect x="7" y="13" width="4" height="4" fill="white"/>
          <rect x="13" y="13" width="4" height="4" fill="white"/>
        </svg>
      `
    },
    {
      name: "ssa",
      slug: "ssa",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M8 9H16M8 12H16M8 15H12" stroke="white" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="3" stroke="white" stroke-width="1.5" fill="none"/>
          <path d="M16.5 18L17.5 19L19.5 17" stroke="white" stroke-width="1" fill="none"/>
        </svg>
      `
    },
    {
      name: "documents",
      slug: "documents",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="6" y="4" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
          <rect x="4" y="6" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
          <rect x="2" y="8" width="12" height="16" rx="1" stroke="white" stroke-width="2" fill="none"/>
        </svg>
      `
    },
    {
      name: "replacements",
      slug: "replacements",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
          <path d="M5 3L3 5V19L5 21H19L21 19V5L19 3H5Z" stroke="white" stroke-width="0.5" fill="none"/>
        </svg>
      `
    },
    {
      name: "samples",
      slug: "samples",
      iconSvg: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <rect x="5" y="5" width="14" height="14" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <rect x="8" y="8" width="3" height="3" fill="white"/>
          <rect x="13" y="8" width="3" height="3" fill="white"/>
          <rect x="8" y="13" width="3" height="3" fill="white"/>
          <rect x="13" y="13" width="3" height="3" fill="white"/>
        </svg>
      `
    }
  ];

  return (
    <div className="page">
      <Topbar />

      <div className="home-content">
        <div className="grid">
          {apps.map((a, idx) => (
            <Link key={idx} to={`/${a.slug}`} className="tile">
              <div
                className="tile-icon"
                dangerouslySetInnerHTML={{ __html: a.iconSvg }}
              />
              <div className="tile-label">{a.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <Link to="/feedback">
        <div className="feedback-bar">FEEDBACK</div>
      </Link>
    </div>
  );
}

//
// ─── ORDERS PAGE ───────────────────────────────────────────────────────────────
//
function OrdersPage() {
  const projects = [
    "BUSINESS FURNISHINGS - MONREAU SEMINARY - NOTRE DAME, IN - 450080",
    "BUSINESS FURNISHINGS - Replacement - 449967",
    "BUSINESS FURNITURE LLC - 9100 KEYSTONE AMENITY- FURNITURE - 448242",
    "BUSINESS FURNITURE LLC - Indiana Pacers - 448180",
    "BUSINESS FURNITURE LLC - Subaru - 448489",
    "BUSINESS FURNITURE LLC - Subaru - 448491",
    "COMMERCIAL OFFICE ENVIRONMENTS - FORUM - 447995",
    "COMMERCIAL OFFICE ENVIRONMENTS - Microsoft - 447002"
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filtered = projects.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [todayDateStr, setTodayDateStr] = useState("");
  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    const year = today.getFullYear();
    setTodayDateStr(`${weekday} - ${month} ${day}, ${year}`);
  }, []);

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">ORDERS</h1>

      <div className="orders-toolbar">
        <div className="orders-search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#888"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className="orders-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <svg
          className="calendar-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#444"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>

      <div className="orders-header-row">
        <span className="orders-date">{todayDateStr}</span>
      </div>

      <div className="orders-list">
        {filtered.map((proj, idx) => (
          <div key={idx} className="orders-item">
            {proj}
          </div>
        ))}
      </div>
    </div>
  );
}

//
// ─── SALES PAGE ────────────────────────────────────────────────────────────────
//
function SalesPage({ leads }) {
  const [todayDateStr, setTodayDateStr] = useState("");
  const [yearPassedPercent, setYearPassedPercent] = useState("0.00");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    const year = today.getFullYear();
    setTodayDateStr(`${weekday} - ${month} ${day}, ${year}`);

    const startOfYear = new Date(year, 0, 1);
    const startOfNextYear = new Date(year + 1, 0, 1);
    const percent =
      ((today.getTime() - startOfYear.getTime()) /
        (startOfNextYear.getTime() - startOfYear.getTime())) *
      100;
    setYearPassedPercent(percent.toFixed(2));
  }, []);

  const [year, setYear] = useState(new Date().getFullYear());
  const salesData = [
    { month: "Jan", bookings: "$1,259,493", sales: "$506,304" },
    { month: "Feb", bookings: "$497,537", sales: "$553,922" },
    { month: "Mar", bookings: "$400,110", sales: "$365,601" },
    { month: "Apr", bookings: "$554,318", sales: "$696,628" },
    { month: "May", bookings: "$869,362", sales: "$1,340,018" },
    { month: "Jun", bookings: "$0", sales: "$0" }
  ];

  const totalBookings = salesData.reduce(
    (sum, row) => sum + Number(row.bookings.replace(/[\$,]/g, "")),
    0
  );
  const totalSales = salesData.reduce(
    (sum, row) => sum + Number(row.sales.replace(/[\$,]/g, "")),
    0
  );
  const formatCurrency = (num) => `$${num.toLocaleString()}`;
  const goalAmount = 7000000;
  const percentAchieved = ((totalBookings / goalAmount) * 100).toFixed(2);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">SALES</h1>

      <div className="sales-toolbar">
        <Link to="/sales/new-leads">
          <button className="new-lead-btn">New Lead +</button>
        </Link>
        <Link to="/sales/rewards">
          <button className="rewards-btn">Rewards</button>
        </Link>
        <Link to="/sales/commissions">
          <button className="commissions-btn">Commissions</button>
        </Link>
        <button className="opportunities-btn" onClick={openModal}>
          Opportunities
        </button>
      </div>

      <div className="content-page">
        <div className="table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333333",
                      cursor: "pointer"
                    }}
                  >
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                  </select>
                </th>
                <th>Bookings</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{row.bookings}</td>
                  <td>{row.sales}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="totals-row">
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalBookings)}</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalSales)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="goal-section">
          <div className="goal-header">
            <span className="goal-label">Goal</span>
            <span className="goal-amount">
              ${(goalAmount / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentAchieved}%` }}
            >
              <span className="progress-text">{percentAchieved}%</span>
            </div>
          </div>
          <div className="year-progress-text">
            {monthDay(todayDateStr)}: {yearPassedPercent}% of year passed.
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              ×
            </span>
            <OpportunitiesPage leads={leads} />
          </div>
        </div>
      )}
    </div>
  );
}

function monthDay(fullDateStr) {
  const parts = fullDateStr.split(" - ");
  if (parts.length === 2) {
    const datePart = parts[1].split(",")[0];
    return datePart;
  }
  return fullDateStr;
}

//
// ─── NEW LEADS PAGE ───────────────────────────────────────────────────────────
//
function NewLeadsPage({ addLead }) {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [decisionMakerName, setDecisionMakerName] = useState("");
  const [decisionMakerRole, setDecisionMakerRole] = useState("");
  const [projectStatus, setProjectStatus] = useState("Discovery");
  const [vertical, setVertical] = useState("Healthcare");
  const [estimatedList, setEstimatedList] = useState("");
  const [poTimeframe, setPoTimeframe] = useState("Jan 2025");
  const [urgency, setUrgency] = useState("Low");
  const [competitors, setCompetitors] = useState("Kimball");
  const [attachments, setAttachments] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      projectName,
      decisionMakerName,
      decisionMakerRole,
      projectStatus,
      vertical,
      estimatedList,
      poTimeframe,
      urgency,
      competitors,
      attachments,
      otherNotes,
      timestamp: new Date().toISOString()
    };
    addLead(newLead);
    navigate("/sales");
  };

  return (
    <div className="page new-lead-page">
      <Topbar />

      <h1 className="new-lead-heading">NEW LEAD</h1>

      <div className="content-page">
        <form className="new-lead-form" onSubmit={handleSubmit}>
          <div className="lead-field lead-full">
            <label>Project</label>
            <input
              type="text"
              placeholder="e.g. Project Alpha"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Decision Maker Name/Email</label>
                <input
                  type="text"
                  placeholder="Name and/or email..."
                  value={decisionMakerName}
                  onChange={(e) => setDecisionMakerName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Decision Maker Role</label>
                <input
                  type="text"
                  placeholder="Enter role..."
                  value={decisionMakerRole}
                  onChange={(e) => setDecisionMakerRole(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="lead-field lead-full">
            <label>Project Status</label>
            <select
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              required
            >
              <option>Discovery</option>
              <option>Specifying</option>
              <option>Bidding/Decision</option>
              <option>PO Expected</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>

          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Vertical</label>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                >
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Corporate</option>
                  <option>Hospitality</option>
                  <option>Government</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Estimated List</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      fontSize: "14px",
                      color: "#555555",
                      pointerEvents: "none"
                    }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    style={{ paddingLeft: "24px" }}
                    value={estimatedList}
                    onChange={(e) => setEstimatedList(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>PO Timeframe</label>
                <select
                  value={poTimeframe}
                  onChange={(e) => setPoTimeframe(e.target.value)}
                >
                  <option>Jan 2025</option>
                  <option>Feb 2025</option>
                  <option>Mar 2025</option>
                  <option>Apr 2025</option>
                  <option>May 2025</option>
                  <option>Jun 2025</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lead-form-row">
            <div className="lead-half">
              <div className="lead-field">
                <label>Competitors</label>
                <select
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                >
                  <option>Kimball</option>
                  <option>Steelcase</option>
                  <option>Herman Miller</option>
                  <option>HON</option>
                </select>
              </div>
            </div>
            <div className="lead-half">
              <div className="lead-field">
                <label>Attachments</label>
                <div style={{ position: "relative" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#888"
                    viewBox="0 0 24 24"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      width: "18px",
                      height: "18px",
                      pointerEvents: "none"
                    }}
                  >
                    <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Include attachment(s)"
                    style={{ paddingRight: "36px" }}
                    value={attachments}
                    onChange={(e) => setAttachments(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lead-field lead-full">
            <label>Other notes</label>
            <textarea
              rows="4"
              placeholder="Other project scope info, install locations, or general details..."
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="lead-submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

//
// ─── OPPORTUNITIES PAGE ────────────────────────────────────────────────────────
//
function OpportunitiesPage({ leads }) {
  const categories = {
    Discovery: [],
    Specifying: [],
    "Bidding/Decision": [],
    "PO Expected": [],
    Won: [],
    Lost: []
  };

  leads.forEach((lead) => {
    const status = lead.projectStatus;
    if (categories[status]) {
      categories[status].push(lead.projectName);
    } else {
      categories["Discovery"].push(lead.projectName);
    }
  });

  return (
    <div className="opp-page">
      {Object.entries(categories).map(([stage, items]) => (
        <div key={stage} className="opp-section">
          <h2>{stage}</h2>
          <ul className="opp-list">
            {items.length > 0 ? (
              items.map((proj, idx) => (
                <li key={idx} className="opp-item">
                  {proj}
                </li>
              ))
            ) : (
              <li
                className="opp-item"
                style={{ fontStyle: "italic", color: "#777" }}
              >
                (No leads in this category)
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

//
// ─── REWARDS PAGE ─────────────────────────────────────────────────────────────
//
function RewardsPage() {
  const [quarter, setQuarter] = useState("Q1 2025");
  const salesRewards = [
    { name: "Deb Butler", amount: "$520.32" },
    { name: "Jason Beehler", amount: "$44.21" },
    { name: "Andrea Kirkland", amount: "$20.00" },
    { name: "Alan Bird", amount: "$1,034.21" }
  ];
  const designerRewards = [{ name: "Jen Franklin", amount: "$12.10" }];

  return (
    <div className="page rewards-page">
      <Topbar />

      <h1 className="rewards-heading">REWARDS</h1>

      <div className="quarter-selector">
        <select
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        >
          <option>Q1 2025</option>
          <option>Q2 2025</option>
          <option>Q3 2025</option>
          <option>Q4 2025</option>
        </select>
      </div>

      <div className="rewards-section">
        <h2>Sales</h2>
        <div className="rewards-list">
          {salesRewards.map((r, i) => (
            <div key={i} className="rewards-item">
              <span>{r.name}</span>
              <span>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-section">
        <h2>Designers</h2>
        <div className="rewards-list">
          {designerRewards.map((r, i) => (
            <div key={i} className="rewards-item">
              <span>{r.name}</span>
              <span>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
// ─── DOCUMENTS PAGE ───────────────────────────────────────────────────────────
//
function DocumentsPage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">DOCUMENTS</h1>

      <div className="content-page documents-page">
        <div className="documents-buttons">
          <button className="doc-btn">Contracts</button>
          <button className="doc-btn">Commission Rates</button>
          <button className="doc-btn">Presentations</button>
          <button className="doc-btn">Sample Discounts</button>
          <button className="doc-btn">Install Instructions</button>
          <button className="doc-btn">Discontinued Finishes</button>
        </div>
      </div>
    </div>
  );
}

//
// ─── LEAD TIMES PAGE ───────────────────────────────────────────────────────────
//
function LeadTimesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://www.jsifurniture.com/resources/lead-times/")
      .then((res) => res.text())
      .then((htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const fullText = doc.body.innerText;
        const lines = fullText
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);

        const casegoodsIdx = lines.findIndex((l) =>
          l.includes("Casegoods + Tables")
        );
        if (casegoodsIdx < 0) return;

        const seriesNames = [];
        let cursor = casegoodsIdx + 1;
        while (
          cursor < lines.length &&
          !/^\d+\s+weeks?$/i.test(lines[cursor])
        ) {
          seriesNames.push(lines[cursor]);
          cursor++;
        }

        const seriesWeeks = [];
        let weeksCursor = cursor;
        while (
          weeksCursor < lines.length &&
          seriesWeeks.length < seriesNames.length
        ) {
          if (/^\d+\s+weeks?$/i.test(lines[weeksCursor])) {
            seriesWeeks.push(lines[weeksCursor]);
          }
          weeksCursor++;
        }

        const items = seriesNames.map((fullName, i) => {
          const displayName = fullName.replace(
            /\s*–\s*(Wood|Uph)\s*$/i,
            ""
          );
          const lower = fullName.toLowerCase();
          const isSeating =
            lower.includes("seating") ||
            displayName.toLowerCase().endsWith("seating");

          const weeksText = seriesWeeks[i] || "0 weeks";
          const weeksNumber = weeksText.split(/\s+/)[0];

          return {
            name: displayName,
            type: isSeating ? "seating" : "table",
            weeks: weeksNumber
          };
        });

        setData(items);
      })
      .catch((err) => console.error("Error fetching/parsing Lead Times:", err));
  }, []);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SeatingIcon = () => (
    <svg
      className="lead-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#333333"
    >
      <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm10 0V9H8v4h8zM5 6h14v2H5V6zm0 11h2v3H5v-3zm12 0h2v3h-2v-3z" />
    </svg>
  );
  const TableIcon = () => (
    <svg
      className="lead-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#333333"
    >
      <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm-2 8h18v-2H2v2zm2 0V19H4v2zm16-2v2h-2v-2h2zM20 4H4v2h16V4z" />
    </svg>
  );

  return (
    <div className="page lead-times-page">
      <Topbar />

      <h1 className="documents-heading">LEAD TIMES</h1>

      <div className="content-page">
        <div className="lead-times-searchbar">
          <div className="lead-times-search-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="#888888" strokeWidth="2" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="lead-times-search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <svg
            className="lead-times-filter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 4h18v2H3V4zm4 6h10v2H7v-2zm-2 6h14v2H5v-2z"
              fill="#888888"
            />
          </svg>
        </div>

        <div className="series-list">
          {filtered.map((item, idx) => (
            <div key={idx} className="series-row">
              <div className="series-icons">
                {item.type === "seating" ? <SeatingIcon /> : <TableIcon />}
                <span className="lead-number">{item.weeks}</span>
              </div>
              <div className="series-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
// ─── FABRICS PAGE ─────────────────────────────────────────────────────────────
//
function FabricsPage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">FABRICS</h1>

      <div className="content-page documents-page">
        <Link to="/fabrics/database">
          <button className="doc-btn">Fabric Database</button>
        </Link>
        <Link to="/fabrics/com-request">
          <button className="doc-btn">COM Ydg Request</button>
        </Link>
      </div>
    </div>
  );
}

//
// ─── FABRIC DATABASE LANDING PAGE ─────────────────────────────────────────────
//
function FabricDatabasePage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">FABRIC DATABASE</h1>

      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the landing page for <strong>Fabric Database</strong>. (Replace
          this stub with actual functionality later.)
        </p>
      </div>
    </div>
  );
}

//
// ─── COM YDG REQUEST PAGE ──────────────────────────────────────────────────────
//
function ComYdgRequestPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pillModel, setPillModel] = useState("");
  const [lines, setLines] = useState([]);

  const addPill = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === "") return;
    setPillModel(trimmed);
    setSearchTerm("");
  };

  const pillClicked = () => {
    if (!pillModel) return;
    const alreadyAdded = lines.some((l) => l.model === pillModel);
    if (!alreadyAdded) {
      setLines((prev) => [
        ...prev,
        { model: pillModel, pattern: "", qty: "" }
      ]);
    }
    setPillModel("");
  };

  const updateLine = (index, field, value) => {
    setLines((prev) =>
      prev.map((ln, i) =>
        i === index
          ? { ...ln, [field]: value }
          : ln
      )
    );
  };

  const allValid =
    lines.length > 0 &&
    lines.every(
      (ln) => ln.pattern.trim() !== "" && Number(ln.qty) > 0
    );

  const handleSubmit = () => {
    alert(`Submitting:\n${JSON.stringify(lines, null, 2)}`);
    setLines([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPill();
    }
  };

  return (
    <div className="page com-page">
      <Topbar />

      <h1 className="com-heading">COM YARD REQUEST</h1>

      <div className="content-page">
        <div className="com-search-wrapper">
          <input
            type="text"
            className="com-search-input"
            placeholder="Search model(s)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <svg
            className="com-search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={addPill}
          >
            <path
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {pillModel && (
          <div className="model-pill" onClick={pillClicked}>
            {pillModel}
          </div>
        )}

        <div className="com-list">
          {lines.map((ln, idx) => (
            <div key={idx} className="com-item">
              <div className="com-item-header">{ln.model}</div>
              <div className="com-item-fields">
                <input
                  type="text"
                  placeholder="Fabric Pattern"
                  value={ln.pattern}
                  onChange={(e) =>
                    updateLine(idx, "pattern", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={ln.qty}
                  onChange={(e) =>
                    updateLine(idx, "qty", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="com-submit-btn"
          disabled={!allValid}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

//
// ─── PRODUCTS PAGE ─────────────────────────────────────────────────────────────
//
function ProductsPage() {
  return (
    <div className="page products-page">
      <Topbar />

      <h1 className="documents-heading">PRODUCTS</h1>

      <div className="content-page">
        <Link to="/products/swivels" className="category-box">
          <div className="category-title">Swivels</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 3"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Swivel 4"
              className="product-img"
            />
          </div>
        </Link>

        <Link to="/products/end-tables" className="category-box">
          <div className="category-title">End Tables</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Table 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Table 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Table 3"
              className="product-img"
            />
          </div>
        </Link>

        <Link to="/products/conference" className="category-box">
          <div className="category-title">Conference</div>
          <div className="product-images">
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 1"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 2"
              className="product-img"
            />
            <img
              src="https://via.placeholder.com/60"
              alt="Conference 3"
              className="product-img"
            />
          </div>
        </Link>

        <Link to="/products/more" className="category-box">
          <div className="category-title">More...</div>
        </Link>

        <div className="prod-buttons">
          <Link to="/products/seating" className="prod-btn">
            <svg
              className="prod-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <path d="M4 17h16v-2H4v2zm2-4h12V7H6v6zm10 0V9H8v4h8zM5 6h14v2H5V6zm0 11h2v3H5v-3zm12 0h2v3h-2v-3z"/>
            </svg>
            <div className="prod-btn-label">Seating</div>
          </Link>
          <Link to="/products/casegoods" className="prod-btn">
            <svg
              className="prod-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#333"
            >
              <rect x="3" y="5" width="18" height="14" rx="1" stroke="#333" strokeWidth="1" fill="none"/>
            </svg>
            <div className="prod-btn-label">Casegoods</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

//
// ─── SWIVELS PAGE (placeholder) ────────────────────────────────────────────────
//
function SwivelsPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">SWIVELS</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Swivels</strong>.
        </p>
      </div>
    </div>
  );
}

//
// ─── END TABLES PAGE (placeholder) ─────────────────────────────────────────────
//
function EndTablesPage() {
  return (
    <div className="page">
      <Topbar />
      <h1 className="documents-heading">END TABLES</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>End Tables</strong>.
        </p>
      </div>
    </div>
  );
}

//
// ─── CONFERENCE PAGE (placeholder) ─────────────────────────────────────────────
//
function ConferencePage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">CONFERENCE</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>Conference</strong>.
        </p>
      </div>
    </div>
  );
}

//
// ─── MORE PAGE (placeholder) ───────────────────────────────────────────────────
//
function MorePage() {
  return (
    <div className="page">
      <Topbar />

      <h1 className="documents-heading">MORE</h1>
      <div className="content-page">
        <p style={{ padding: "0 16px", color: "#333333" }}>
          This is the placeholder page for <strong>More</strong>.
        </p>
      </div>
    </div>
  );
}

//
// ─── REPLACEMENTS PAGE ─────────────────────────────────────────────────────────
//
function ReplacementsPage() {
  const fileInputRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [soNumber, setSoNumber] = useState("");
  const [lineItem, setLineItem] = useState("");
  const [notes, setNotes] = useState("");

  const handleTakePhoto = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Replacement Submitted:\nSO #: ${soNumber}\nLine Item: ${lineItem}\nNotes: ${notes}`
    );
    setPhotoFile(null);
    setPreviewUrl(null);
    setSoNumber("");
    setLineItem("");
    setNotes("");
  };

  return (
    <div className="page replacements-page">
      <Topbar />

      <h1 className="documents-heading">REPLACEMENTS</h1>

      <div className="content-page">
        {previewUrl ? (
          <div>
            <img src={previewUrl} alt="Preview" className="image-preview" />
            <div className="form-container">
              <div className="form-field">
                <label htmlFor="soNumber">SO #</label>
                <input
                  type="text"
                  id="soNumber"
                  value={soNumber}
                  onChange={(e) => setSoNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="lineItem">Line Item</label>
                <input
                  type="text"
                  id="lineItem"
                  value={lineItem}
                  onChange={(e) => setLineItem(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                SUBMIT
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-button-container">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileChosen}
              style={{ display: "none" }}
            />
            <button
              onClick={handleTakePhoto}
              className="action-btn"
              type="button"
            >
              <div className="tile-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                >
                  <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v4h4V7h3l-5-5z" />
                </svg>
              </div>
              <div className="tile-label">UPLOAD</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

//
// ─── SAMPLES PAGE ─────────────────────────────────────────────────────────────
//
function SamplesPage() {
  return (
    <div className="page samples-page">
      <Topbar />

      <h1 className="documents-heading">SAMPLES</h1>

      <div className="content-page">
        <div className="dashboard-grid">
          <div className="dashboard-card">Sample A</div>
        </div>
        <button className="action-btn">Action</button>
      </div>
    </div>
  );
}

//
// ─── SSA PAGE ────────────────────────────────────────────────────────────────
//
function SSAPage() {
  const [form, setForm] = useState({
    company: "",
    clientName: "",
    dealer: "",
    estList: "",
    estJobCost: "",
    comments: ""
  });
  const [searchDealer, setSearchDealer] = useState("");
  const [waiveOne, setWaiveOne] = useState(false);
  const [waiveTwo, setWaiveTwo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSSA = (e) => {
    e.preventDefault();
    alert(`SSA Submitted:\n${JSON.stringify(form, null, 2)}`);
    setForm({
      company: "",
      clientName: "",
      dealer: "",
      estList: "",
      estJobCost: "",
      comments: ""
    });
    setWaiveOne(false);
    setWaiveTwo(false);
  };

  return (
    <div className="page ssa-page">
      <Topbar />

      <h1 className="documents-heading">SSA</h1>

      <div className="content-page">
        <form className="ssa-form" onSubmit={handleSubmitSSA}>
          <div className="ssa-form-field">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Enter company name"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ssa-form-field">
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Enter client name"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ssa-form-field ssa-search-wrapper">
            <label htmlFor="dealer">Dealer</label>
            <input
              type="text"
              id="dealer"
              name="dealer"
              placeholder="Search Dealer"
              value={searchDealer}
              onChange={(e) => setSearchDealer(e.target.value)}
              required
            />
            <svg
              className="ssa-search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" stroke="#888888" strokeWidth="2" fill="none" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="ssa-form-field">
            <label htmlFor="estList">Estimated List</label>
            <div className="ssa-dollar-wrapper">
              <span className="ssa-dollar-sign">$</span>
              <input
                type="number"
                id="estList"
                name="estList"
                placeholder="0.00"
                value={form.estList}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ssa-form-field">
            <label htmlFor="estJobCost">Estimated Job Cost</label>
            <div className="ssa-dollar-wrapper">
              <span className="ssa-dollar-sign">$</span>
              <input
                type="number"
                id="estJobCost"
                name="estJobCost"
                placeholder="0.00"
                value={form.estJobCost}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="ssa-form-field-inline">
            <div className="ssa-checkbox-group waiver-section">
              <label>
                <input
                  type="checkbox"
                  checked={waiveOne}
                  onChange={() => setWaiveOne(!waiveOne)}
                />
                Waive One
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={waiveTwo}
                  onChange={() => setWaiveTwo(!waiveTwo)}
                />
                Waive Two
              </label>
            </div>
          </div>

          <div className="ssa-form-field">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              rows="3"
              placeholder="Additional comments."
              value={form.comments}
              onChange={handleChange}
            />
          </div>

          <div className="ssa-form-actions">
            <button type="submit" className="ssa-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//
// ─── FEEDBACK PAGE ────────────────────────────────────────────────────────────
//
function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page feedback-page">
      <Topbar />

      <h1 className="feedback-heading">FEEDBACK</h1>

      <div className="content-page">
        {submitted ? (
          <div className="submitted-message">
            Thank you! Your feedback has been submitted.
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="feedback-field">
              <label>Name</label>
              <input type="text" required />
            </div>
            <div className="feedback-field">
              <label>Comments</label>
              <textarea rows="4" required />
            </div>
            <div className="feedback-file-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#888"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5"></path>
                <path d="M12 15V3"></path>
              </svg>
              <input type="text" placeholder="Upload file." />
            </div>
            <button className="feedback-submit-btn">SUBMIT</button>
          </form>
        )}
      </div>
    </div>
  );
}

//
// ─── APP ROOT ─────────────────────────────────────────────────────────────────
//
export default function App({ leads, addLead }) {
  return (
    <>
      {/* Inlined stylesheet for entire application */}
      <style dangerouslySetInnerHTML={{ __html: appStyles }} />

      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/sales" element={<SalesPage leads={leads} />} />
            <Route
              path="/sales/new-leads"
              element={<NewLeadsPage addLead={addLead} />}
            />
            <Route path="/sales/rewards" element={<RewardsPage />} />
            <Route path="/sales/commissions" element={<RewardsPage />} />
            <Route path="/lead-times" element={<LeadTimesPage />} />
            <Route path="/fabrics" element={<FabricsPage />} />
            <Route
              path="/fabrics/database"
              element={<FabricDatabasePage />}
            />
            <Route
              path="/fabrics/com-request"
              element={<ComYdgRequestPage />}
            />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/swivels" element={<SwivelsPage />} />
            <Route path="/products/end-tables" element={<EndTablesPage />} />
            <Route
              path="/products/conference"
              element={<ConferencePage />}
            />
            <Route path="/products/more" element={<MorePage />} />
            <Route path="/replacements" element={<ReplacementsPage />} />
            <Route path="/ssa" element={<SSAPage />} />
            <Route path="/samples" element={<SamplesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
