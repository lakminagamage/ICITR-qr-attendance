import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthorDetailsForm({ formData }) {
  return (
    <Card className="w-full bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Author Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Please confirm if your details below here are accurate
        </p>
      </CardHeader>
      <CardContent>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-md font-semibold leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Title + " " + formData.Name_With_Initials || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">University/Institution</dt>
              <dd className="mt-1 text-md font-semibold leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.University || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Email Address</dt>
              <dd className="mt-1 text-sm font-normal leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Email || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Locality</dt>
              <dd className="mt-1 text-sm font-normal leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Locality || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Registration Type</dt>
              <dd className="mt-1 text-sm font-normal leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Registration_Type || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Paper Title</dt>
              <dd className="mt-1 text-md font-semibold leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Paper_Title || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Contact Number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Contact_Number || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Corresponding Author</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Corresponding_Author || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Presenting Author</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Presenting_Author_Name || ""}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">Co-Authors</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.Co_Author_Names || ""}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm leading-6 text-gray-900">IEEE Membership Status</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-950 sm:col-span-2 sm:mt-0">
                {formData.IEEE_Membership || ""}
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}