"use server";

export async function getDataById(job: string) {
    const data = await fetch('/api/job.json');
    const response = await data.json();
    return response;
}