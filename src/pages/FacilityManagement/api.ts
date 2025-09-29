import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib";
import type { PaginatedResponse } from "../../lib/types";

/**
 * API response types
 */
interface FacilityApiResponse {}

interface Facility {}

/**
 * Workflow API functions
 */
const workflowsApiExtended = {
  getWorkflows: async (
    params: URLSearchParams
  ): Promise<PaginatedResponse<Facility>> => {
    const response = await api.get<
      FacilityApiResponse[] | PaginatedResponse<FacilityApiResponse>
    >(`api/v1/workflows?${params.toString()}`);

    // Handle different response structures
    if (Array.isArray(response)) {
      // Direct array response
      return {
        items: response.map(() => {
          return [];
        }),
        total: response.length,
        page: 1,
        size: response.length,
      };
    }

    // Paginated response
    return {
      ...response,
      items: response.items?.map(() => {}) || [],
    };
  },

  //   getWorkflow: async (id: string): Promise<Workflow> => {
  //     const response = await api.get<WorkflowApiResponse>(
  //       `api/v1/workflows/${id}`
  //     );
  //     return normalizeWorkflow(response);
  //   },

  //   createWorkflow: async (data: CreateWorkflowDto): Promise<Workflow> => {
  //     const response = await api.post<WorkflowApiResponse>("api/v1/workflows", {
  //       json: data,
  //     });
  //     return normalizeWorkflow(response);
  //   },

  //   updateWorkflow: async (
  //     id: string,
  //     data: Partial<CreateWorkflowDto>
  //   ): Promise<Workflow> => {
  //     const response = await api.put<WorkflowApiResponse>(
  //       `api/v1/workflows/${id}`,
  //       { json: data }
  //     );
  //     return normalizeWorkflow(response);
  //   },

  //   deleteWorkflow: async (id: string): Promise<void> => {
  //     return api.delete(`api/v1/workflows/${id}`);
  //   },
};

/**
 * Get paginated workflows list with search and sort
 */
// export const useWorkflows = (params: ListParams = {}) => {
//   const searchParams = createListParams(params);

//   return useQuery({
//     queryKey: workflowKeys.list(searchParams),
//     queryFn: () => workflowsApiExtended.getWorkflows(searchParams),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

/**
 * Get single workflow by ID
 */
// export const useWorkflow = (id: string) => {
//   return useQuery({
//     queryKey: workflowKeys.detail(id),
//     queryFn: () => workflowsApiExtended.getWorkflow(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//   });
// };

/**
 * Get paginated steps for a workflow
 */
// export const useWorkflowSteps = (id: string, params: ListParams = {}) => {
//   const searchParams = createListParams(params);

//   return useQuery({
//     queryKey: workflowKeys.stepsList(id, searchParams),
//     queryFn: () => workflowsApiExtended.getWorkflowSteps(id, searchParams),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//   });
// };

/**
 * Create workflow mutation
 */
// export const useCreateWorkflow = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: CreateWorkflowDto) =>
//       workflowsApiExtended.createWorkflow(data),
//     onSuccess: () => {
//       // Invalidate all workflow lists
//       queryClient.invalidateQueries({ queryKey: workflowKeys.lists() });
//     },
//   });
// };

/**
 * Update workflow mutation
 */
// export const useUpdateWorkflow = (id: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     /*************  ✨ Windsurf Command ⭐  *************/
//     /**
//      * Update workflow mutation function
//      * Calls the updateWorkflow function from the workflows API
//      * @param {Partial<CreateWorkflowDto>} data - Partial workflow data to update
//      * @returns {Promise<Workflow>} - Updated workflow data
//      */
//     /*******  7eccd496-cf9f-4342-bf66-3a8859948398  *******/ mutationFn: (
//       data: Partial<CreateWorkflowDto>
//     ) => workflowsApiExtended.updateWorkflow(id, data),
//     onSuccess: (updatedWorkflow) => {
//       // Update the specific workflow in cache
//       queryClient.setQueryData(workflowKeys.detail(id), updatedWorkflow);
//       // Invalidate workflow lists to ensure they reflect the update
//       queryClient.invalidateQueries({ queryKey: workflowKeys.lists() });
//     },
//   });
// };

/**
 * Delete workflow mutation
 */
// export const useDeleteWorkflow = (id: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => workflowsApiExtended.deleteWorkflow(id),
//     onSuccess: () => {
//       // Remove the specific workflow from cache
//       queryClient.removeQueries({ queryKey: workflowKeys.detail(id) });
//       // Invalidate workflow lists
//       queryClient.invalidateQueries({ queryKey: workflowKeys.lists() });
//     },
//   });
// };
