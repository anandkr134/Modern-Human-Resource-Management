import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllLeaves, updateLeaveStatus } from "@/api/api";

const LeaveApplications = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) return <p className="text-slate-300">Loading leave data...</p>;

  return (
    <Card className="bg-slate-800/60 border border-slate-700 p-6 shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">Leave Applications</h2>

      {leaves.length === 0 ? (
        <p className="text-slate-400">No leave applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-700 text-slate-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Email</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b border-slate-700">
                  <td className="p-3">{leave.user?.name}</td>
                  <td className="p-3">{leave.user?.email}</td>
                  <td className="p-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">{leave.status}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-400 hover:bg-green-500/20"
                      onClick={() => handleStatusChange(leave._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-400 hover:bg-red-500/20"
                      onClick={() => handleStatusChange(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default LeaveApplications;
