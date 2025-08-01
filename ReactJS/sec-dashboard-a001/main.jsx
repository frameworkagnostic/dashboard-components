/*
 * GitHub Vulnerability Dashboard
 *
 * This component demonstrates the separation of data and UI configuration.
 * In a real application, you would load data and UI config from external sources:
 * - API endpoints for vulnerability data
 * - Configuration files or CMS for UI text and labels
 */

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  GitCommit,
  GitPullRequest,
  Code,
  Calendar,
  User,
  FileText,
} from "lucide-react";

// Mock data - in a real app, this would come from data.json
const mockData = {
  vulnerabilities: [
    {
      repo: "acme/web-app",
      type: "commit",
      year: 2024,
      title: "Fix SQL injection vulnerability in user authentication",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "security-team",
      filename: "auth/login.js",
      sha: "a1b2c3d4e5f6",
      message: "Fix SQL injection vulnerability in user authentication",
    },
    {
      repo: "acme/api-server",
      type: "pull_request",
      year: 2024,
      title: "Patch XSS vulnerability in comment system",
      pr_id: 123,
      pr_number: 456,
      state: "merged",
      user: "dev-alice",
      filename: "comments/render.js",
      sha: "b2c3d4e5f6g7",
      message: "Patch XSS vulnerability in comment system",
    },
    {
      repo: "acme/mobile-app",
      type: "code",
      year: 2023,
      title: "Remove hardcoded API keys",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "dev-bob",
      filename: "config/secrets.js",
      sha: "c3d4e5f6g7h8",
      message: "Remove hardcoded API keys",
    },
    {
      repo: "acme/web-app",
      type: "pull_request",
      year: 2024,
      title: "Update dependencies to fix security vulnerabilities",
      pr_id: 789,
      pr_number: 321,
      state: "open",
      user: "dependabot",
      filename: "package.json",
      sha: "d4e5f6g7h8i9",
      message: "Update dependencies to fix security vulnerabilities",
    },
    {
      repo: "acme/api-server",
      type: "commit",
      year: 2023,
      title: "Implement rate limiting to prevent DoS attacks",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "security-lead",
      filename: "middleware/rateLimit.js",
      sha: "e5f6g7h8i9j0",
      message: "Implement rate limiting to prevent DoS attacks",
    },
    {
      repo: "acme/dashboard",
      type: "pull_request",
      year: 2024,
      title: "Fix CSRF vulnerability in admin panel",
      pr_id: 555,
      pr_number: 777,
      state: "closed",
      user: "admin-user",
      filename: "admin/csrf-protection.js",
      sha: "f6g7h8i9j0k1",
      message: "Fix CSRF vulnerability in admin panel",
    },
    {
      repo: "acme/payment-service",
      type: "commit",
      year: 2024,
      title: "Encrypt sensitive payment data",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "crypto-team",
      filename: "payment/encryption.js",
      sha: "g7h8i9j0k1l2",
      message: "Encrypt sensitive payment data",
    },
    {
      repo: "acme/user-service",
      type: "code",
      year: 2023,
      title: "Remove debug logs containing passwords",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "dev-charlie",
      filename: "auth/debug.js",
      sha: "h8i9j0k1l2m3",
      message: "Remove debug logs containing passwords",
    },
    {
      repo: "acme/web-app",
      type: "pull_request",
      year: 2024,
      title: "Implement Content Security Policy headers",
      pr_id: 999,
      pr_number: 1001,
      state: "merged",
      user: "security-team",
      filename: "middleware/security-headers.js",
      sha: "i9j0k1l2m3n4",
      message: "Implement Content Security Policy headers",
    },
    {
      repo: "acme/notification-service",
      type: "commit",
      year: 2023,
      title: "Fix authentication bypass in webhook handler",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "webhook-team",
      filename: "webhooks/auth.js",
      sha: "j0k1l2m3n4o5",
      message: "Fix authentication bypass in webhook handler",
    },
    {
      repo: "acme/mobile-app",
      type: "pull_request",
      year: 2024,
      title: "Patch insecure direct object reference",
      pr_id: 202,
      pr_number: 404,
      state: "open",
      user: "mobile-dev",
      filename: "api/user-data.js",
      sha: "k1l2m3n4o5p6",
      message: "Patch insecure direct object reference",
    },
    {
      repo: "acme/analytics",
      type: "code",
      year: 2023,
      title: "Remove sensitive data from error messages",
      pr_id: null,
      pr_number: null,
      state: null,
      user: "data-team",
      filename: "error-handler/messages.js",
      sha: "l2m3n4o5p6q7",
      message: "Remove sensitive data from error messages",
    },
  ],
};

// Mock UI configuration - in a real app, this would come from ui.json
const uiConfig = {
  header: {
    title: "Security Vulnerability Dashboard",
    subtitle:
      "Track and manage security vulnerabilities across GitHub repositories",
  },
  tabs: {
    vulnerabilities: { label: "Vulnerabilities" },
    analytics: { label: "Analytics" },
    reports: { label: "Reports" },
  },
  search: {
    placeholder: "Search vulnerabilities, repos, users, files...",
    buttonText: "Filters",
    resultsText: "vulnerabilities found",
    clearFiltersText: "Clear all filters",
  },
  filters: {
    labels: {
      type: "Type",
      year: "Year",
      state: "State",
      repository: "Repository",
    },
    options: {
      allTypes: "All Types",
      allYears: "All Years",
      allStates: "All States",
      allRepositories: "All Repositories",
    },
  },
  table: {
    headers: {
      type: "Type",
      vulnerability: "Vulnerability",
      repository: "Repository",
      file: "File",
      user: "User",
      year: "Year",
      state: "State",
      actions: "Actions",
    },
    actions: { viewOnGithub: "View on GitHub" },
    typeLabels: {
      commit: "Commit",
      pull_request: "Pull Request",
      code: "Code",
    },
    shaPrefix: "SHA: ",
  },
  emptyState: {
    title: "No vulnerabilities found",
    description: "Try adjusting your search terms or filters",
  },
};

const sampleData = mockData.vulnerabilities;

const VulnerabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState("vulnerabilities");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    year: "",
    state: "",
    repo: "",
  });

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const types = [...new Set(sampleData.map((item) => item.type))];
    const years = [...new Set(sampleData.map((item) => item.year))].sort(
      (a, b) => b - a
    );
    const states = [
      ...new Set(sampleData.map((item) => item.state).filter(Boolean)),
    ];
    const repos = [...new Set(sampleData.map((item) => item.repo))];

    return { types, years, states, repos };
  }, []);

  // Fuzzy search and filtering logic
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      // Text search across multiple fields
      const searchFields = [
        item.title || item.message,
        item.repo,
        item.user,
        item.filename,
        item.sha,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchTerm === "" || searchFields.includes(searchTerm.toLowerCase());

      // Apply filters
      const matchesFilters =
        (filters.type === "" || item.type === filters.type) &&
        (filters.year === "" || item.year.toString() === filters.year) &&
        (filters.state === "" || item.state === filters.state) &&
        (filters.repo === "" || item.repo === filters.repo);

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);

  const generateGitHubLink = (item) => {
    const baseUrl = `https://github.com/${item.repo}`;
    if (item.type === "pull_request") {
      return `${baseUrl}/pull/${item.pr_number}`;
    } else if (item.type === "commit" || item.type === "code") {
      return `${baseUrl}/commit/${item.sha}`;
    }
    return baseUrl;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "commit":
        return <GitCommit className="w-4 h-4" />;
      case "pull_request":
        return <GitPullRequest className="w-4 h-4" />;
      case "code":
        return <Code className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStateStyle = (state) => {
    switch (state) {
      case "merged":
        return "bg-purple-100 text-purple-800";
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setFilters({ type: "", year: "", state: "", repo: "" });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {uiConfig.header.title}
          </h1>
          <p className="text-gray-600">{uiConfig.header.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("vulnerabilities")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "vulnerabilities"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {uiConfig.tabs.vulnerabilities.label} ({filteredData.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "analytics"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {uiConfig.tabs.analytics.label}
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reports"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {uiConfig.tabs.reports.label}
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "vulnerabilities" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={uiConfig.search.placeholder}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  {uiConfig.search.buttonText}
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {uiConfig.filters.labels.type}
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={filters.type}
                        onChange={(e) =>
                          setFilters({ ...filters, type: e.target.value })
                        }
                      >
                        <option value="">
                          {uiConfig.filters.options.allTypes}
                        </option>
                        {filterOptions.types.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {uiConfig.filters.labels.year}
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={filters.year}
                        onChange={(e) =>
                          setFilters({ ...filters, year: e.target.value })
                        }
                      >
                        <option value="">
                          {uiConfig.filters.options.allYears}
                        </option>
                        {filterOptions.years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {uiConfig.filters.labels.state}
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={filters.state}
                        onChange={(e) =>
                          setFilters({ ...filters, state: e.target.value })
                        }
                      >
                        <option value="">
                          {uiConfig.filters.options.allStates}
                        </option>
                        {filterOptions.states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {uiConfig.filters.labels.repository}
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={filters.repo}
                        onChange={(e) =>
                          setFilters({ ...filters, repo: e.target.value })
                        }
                      >
                        <option value="">
                          {uiConfig.filters.options.allRepositories}
                        </option>
                        {filterOptions.repos.map((repo) => (
                          <option key={repo} value={repo}>
                            {repo}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {filteredData.length} {uiConfig.search.resultsText}
                    </span>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {uiConfig.search.clearFiltersText}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Vulnerability Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.type}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.vulnerability}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.repository}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.file}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.user}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.year}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.state}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {uiConfig.table.headers.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {uiConfig.table.typeLabels[item.type] ||
                                item.type.replace("_", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {item.title || item.message}
                          </div>
                          <div className="text-xs text-gray-500">
                            {uiConfig.table.shaPrefix}
                            {item.sha}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {item.repo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600 font-mono">
                            {item.filename}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {item.user}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {item.year}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.state && (
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStateStyle(
                                item.state
                              )}`}
                            >
                              {item.state}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={generateGitHubLink(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {uiConfig.table.actions.viewOnGithub}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      {uiConfig.emptyState.title}
                    </h3>
                    <p>{uiConfig.emptyState.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === "analytics" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600">
              Analytics and reporting features will be available here.
            </p>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">
              Generate and download reports from this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VulnerabilityDashboard;
