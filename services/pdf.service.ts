import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { ProjectWithReport } from "@/types/database.types";
import { VENTURE_IQ } from "@/lib/constants";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a2e",
  },
  header: {
    marginBottom: 24,
    borderBottom: "2 solid #6366f1",
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6366f1",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#666",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6366f1",
    marginBottom: 8,
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 4,
  },
  scoreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  scoreBox: {
    width: "30%",
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 8,
    color: "#666",
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6366f1",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  listItem: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 3,
    paddingLeft: 8,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
  },
});

function ReportDocument({ project }: { project: ProjectWithReport }) {
  const scores = project.venture_scores;
  const analysis = project.analyses;
  const competitors = project.competitors;
  const branding = project.branding;
  const roadmap = project.roadmaps;

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.title }, project.title),
        React.createElement(
          Text,
          { style: styles.subtitle },
          `Venture Validation Report — Powered by ${VENTURE_IQ}`
        ),
        React.createElement(
          Text,
          { style: styles.subtitle },
          `Generated: ${new Date().toLocaleDateString()}`
        )
      ),

      scores &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            Text,
            { style: styles.sectionTitle },
            `${VENTURE_IQ} Scores`
          ),
          React.createElement(
            View,
            { style: styles.scoreGrid },
            Object.entries({
              Overall: scores.overall_score,
              "Market Demand": scores.market_demand,
              Competition: scores.competition,
              "Revenue Potential": scores.revenue_potential,
              Scalability: scores.scalability,
              Feasibility: scores.feasibility,
            }).map(([label, value]) =>
              React.createElement(
                View,
                { key: label, style: styles.scoreBox },
                React.createElement(Text, { style: styles.scoreLabel }, label),
                React.createElement(
                  Text,
                  { style: styles.scoreValue },
                  `${value}/100`
                )
              )
            )
          )
        ),

      analysis &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Idea Analysis"),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "Problem Statement"),
          React.createElement(Text, { style: styles.text }, analysis.problem_statement),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "Target Audience"),
          React.createElement(Text, { style: styles.text }, analysis.target_audience),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "Value Proposition"),
          React.createElement(Text, { style: styles.text }, analysis.value_proposition),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "Opportunity Summary"),
          React.createElement(Text, { style: styles.text }, analysis.opportunity_summary)
        ),

      competitors &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Competitor Analysis"),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "Direct Competitors"),
          ...competitors.direct_competitors.map((c) =>
            React.createElement(Text, { key: c, style: styles.listItem }, `• ${c}`)
          ),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold", marginTop: 8 } }, "Differentiation Opportunities"),
          ...competitors.differentiation.map((d) =>
            React.createElement(Text, { key: d, style: styles.listItem }, `• ${d}`)
          )
        ),

      branding &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Branding"),
          React.createElement(Text, { style: styles.text }, `Tagline: ${branding.tagline}`),
          React.createElement(Text, { style: styles.text }, `Names: ${branding.name_suggestions.join(", ")}`),
          React.createElement(Text, { style: styles.text }, branding.brand_personality)
        ),

      roadmap &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Startup Roadmap"),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold" } }, "MVP Features"),
          ...roadmap.mvp_features.map((f) =>
            React.createElement(Text, { key: f, style: styles.listItem }, `• ${f}`)
          ),
          React.createElement(Text, { style: { ...styles.text, fontWeight: "bold", marginTop: 8 } }, "Launch Recommendations"),
          ...roadmap.launch_recommendations.map((r) =>
            React.createElement(Text, { key: r, style: styles.listItem }, `• ${r}`)
          )
        ),

      React.createElement(
        Text,
        { style: styles.footer },
        `Nandaris AI — ${VENTURE_IQ} — Confidential`
      )
    )
  );
}

export async function generateProjectPDF(
  project: ProjectWithReport
): Promise<Buffer> {
  const doc = <ReportDocument project={project} />;
  const blob = await pdf(doc).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
