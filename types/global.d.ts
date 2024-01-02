interface ErrorResponse {
  msg: string;
}

interface AIRquest {
  claim: string;
}

interface AIResponse {
  claim: string;
  evidence: string;
  final_label: number;
  provider: string;
  url: string;
}

interface FactCheckRequest {
  email: string;
  isQuick: boolean;
  groupId: number;
  claim: string;
}

interface FactCheckResponse {
  claimId: number;
  claim: string;
  final_label: number;
  evidence: string;
  url: string;
  provider: string;
  groupId: number;
}

interface FactCheckGroupRequest {
  email: string;
}

interface FactCheckGroupResponse {
  groupList: {
    id: number;
    name: string;
    modified_date: Date;
  }[];
}

interface GroupResultRequest {
  groupId: number;
  email: string;
}

interface GroupResultResponse {
  claimList: ClaimResult[];
}

interface CreateClaimGroupRequest {
  email: string;
  groupName: string;
}

interface SingleClaimRequest {
  email: string;
  claimId: number;
}

interface SingleClaimResponse extends FactCheckResponse {
  claimId: number;
}

// ANCHOR Auth
interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  cpassword: string;
  role_id?: string;
}

interface AccountFormData {
  name: string;
  email: string;
  username: string;
  password: string;
  role_id: string;
  phone: string;
}

interface AccountModRequest extends AccountFormData {
  old_email: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role_id?: string;
}

interface RegisterResponse {
  username: string;
  password: string;
}

interface GetRoleRequest {
  email: string;
}

interface GetRoleResponse {
  role: string;
}

interface AccountListRequest {
  email: string;
}

interface AccountListResponse {
  accounts: {
    name: string;
    phone: string;
    email: string;
    username: string;
    role: string;
  }[];
}

interface FeedBackRequest {
  email: string;
  isNegative: boolean;
  claimId: number;
  feedBackCheck: {
    isIncorrectEvidence: boolean;
    isIncorrectRating: boolean;
  };
  description: string;
}

interface FeedBackListRequest {
  email: string;
}

interface FeedBackListResponse {
  list: {
    id: number;
    isPositive: string;
    feedBackCheck: {
      isIncorrectEvidence: string;
      isIncorrectRating: string;
    };
    description: string;
  }[];

  summary: {
    positive_count: number;
    negative_count: number;
    wrong_evidence_count: number;
    wrong_rating_count: number;
  };
}

interface FactCheckStatisticResponse {
  year: number;
  statistic: FactCheckStatistic;
  popular_source: string;
  by_month: {
    month: number;
    popular_source: string;
    statistic: FactCheckStatistic;
    by_day: {
      day: number;
      statistic: FactCheckStatistic;
    }[];
  }[];
}

interface FactCheckStatistic {
  total_fact_check: number;
  total_approved: number;
  total_refuted: number;
  total_neutral: number;
}

interface UsageStatisticResponse {
  year: number;
  by_month: {
    month: number;
    by_hour: {
      hour: number;
      count: number;
    }[];
    by_day: {
      day: number;
      by_hour: {
        hour: number;
        count: number;
      }[];
    }[];
  }[];
}

interface EvidenceSourcesRequest {
  email: string;
}

interface EvidenceSource {
  id: number;
  name: string;
  scraping_url: string;
  status?: boolean;
}

interface EvidenceSourcesResponse {
  sources: EvidenceSource[];
}

interface DeleteResultRequest {
  claimId: number;
  email: string;
}

// ANCHOR CSS
interface SearchResultCSS {
  background_1: string;
  background_2: string;
}

interface ClaimResult {
  id: number;
  groupId: number;
  rating: number;
  claim: string;
  evidence: string;
  provider: string;
  url: string;
}

interface ScrapingStatusResponse {
  list: {
    id: number;
    name: string;
    scraping_url: string;
    status: boolean;
  }[];
}

interface ExternalScrapingRequest {
  data: {
    id: number;
    name: string;
    scraping_url: string;
  }[];
}

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}
