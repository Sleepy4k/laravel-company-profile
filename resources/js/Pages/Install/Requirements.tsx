import { PageProps } from "@/types";
import ErrorIcon from "./partials/ErrorIcon";
import PassesIcon from "./partials/PassesIcon";
import InstallationLayout from "@/Layouts/InstallationLayout";
import ButtonNavSuccess from "./partials/ButtonNavSuccess";
import ButtonNavError from "./partials/ButtonNavError";
import StatusCheckerBox from "./partials/StatusCheckerBox";
import TableHead from "./partials/TableHead";
import TableBody from "./partials/TableBody";

type IRequirementsProps = PageProps<{
  errors: boolean | null;
  results: {
    extensions: {
      [key: string]: boolean;
    };
    php: {
      [key: string]: boolean;
    };
    functions: {
      [key: string]: boolean;
    };
  };
  recommended: {
    php: {
      [key: string]: boolean;
    };
    functions: {
      [key: string]: boolean;
    };
  };
}>;

type IPHPDataListProps = PageProps<{
  minimum: string;
  supported: boolean;
  current: string;
}>;

export default function Requirements({
  php,
  errors,
  requirements,
}: PageProps<{ php: IPHPDataListProps; requirements: IRequirementsProps }>) {
  const TableTitle = ({
    title,
    className,
  }: {
    title: string;
    className?: string;
  }) => {
    return (
      <h4
        className={"my-5 text-lg font-semibold text-neutral-800 " + className}
      >
        {title}
      </h4>
    );
  };

  return (
    <InstallationLayout step={1} errors={errors} title="Requirements">
      <div className="p-3">
        <TableTitle title="PHP Version" />

        <StatusCheckerBox>
          <TableHead>
            <TableHead.Content>Required PHP Version</TableHead.Content>
            <TableHead.Content>Current</TableHead.Content>
          </TableHead>

          <TableBody>
            <TableBody.Row>
              <TableBody.Content className="font-medium">
                {`${php["minimum"]} or higher`}
              </TableBody.Content>
              <TableBody.Content>
                <span
                  className={`${
                    php["supported"] ? "text-success-500" : "text-danger-500"
                  } inline-flex`}
                >
                  {php["supported"] ? <PassesIcon /> : <ErrorIcon />}

                  {php["current"]}
                </span>
              </TableBody.Content>
            </TableBody.Row>
          </TableBody>
        </StatusCheckerBox>

        <TableTitle title="Required PHP Extensions" className="mt-10" />

        <StatusCheckerBox>
          <TableHead>
            <TableHead.Content>Extension</TableHead.Content>
            <TableHead.Content>Enabled</TableHead.Content>
          </TableHead>

          <TableBody>
            {Object.entries(requirements["results"]["php"]).map(
              ([requirement, enabled]) => (
                <TableBody.Row key={requirement}>
                  <TableBody.Content className="font-medium">
                    {requirement}
                  </TableBody.Content>
                  <TableBody.Content>
                    <span
                      className={`${
                        enabled ? "text-success-500" : "text-danger-500"
                      } inline-flex`}
                    >
                      {enabled ? <PassesIcon /> : <ErrorIcon />}

                      {enabled ? "Yes" : "No"}
                    </span>
                  </TableBody.Content>
                </TableBody.Row>
              )
            )}
          </TableBody>
        </StatusCheckerBox>

        <TableTitle title="Required PHP Functions" className="mt-10" />

        <StatusCheckerBox>
          <TableHead>
            <TableHead.Content>Function</TableHead.Content>
            <TableHead.Content>Enabled</TableHead.Content>
          </TableHead>

          <TableBody>
            {Object.entries(requirements["results"]["functions"]).map(
              ([func, enabled]) => (
                <TableBody.Row key={func}>
                  <TableBody.Content className="font-medium">
                    {func}
                  </TableBody.Content>
                  <TableBody.Content>
                    <span
                      className={`${
                        enabled ? "text-success-500" : "text-danger-500"
                      } inline-flex`}
                    >
                      {enabled ? <PassesIcon /> : <ErrorIcon />}

                      {enabled ? "Yes" : "No"}
                    </span>
                  </TableBody.Content>
                </TableBody.Row>
              )
            )}
          </TableBody>
        </StatusCheckerBox>

        <TableTitle
          title="Recommended PHP Extensions/Functions"
          className="mt-10"
        />

        <StatusCheckerBox>
          <TableHead>
            <TableHead.Content>Requirement</TableHead.Content>
            <TableHead.Content>Enabled</TableHead.Content>
          </TableHead>

          <TableBody>
            {Object.entries(requirements["recommended"]["php"]).map(
              ([requirement, enabled]) => (
                <TableBody.Row key={requirement}>
                  <TableBody.Content className="font-medium">
                    {requirement}{" "}
                    <span className="text-xs text-neutral-400">(ext)</span>
                  </TableBody.Content>
                  <TableBody.Content>
                    <span
                      className={`${
                        enabled ? "text-success-500" : "text-danger-500"
                      } inline-flex`}
                    >
                      {enabled ? <PassesIcon /> : <ErrorIcon />}

                      {enabled ? "Yes" : "No"}
                    </span>
                  </TableBody.Content>
                </TableBody.Row>
              )
            )}
            {Object.entries(requirements["recommended"]["functions"]).map(
              ([func, enabled]) => (
                <TableBody.Row key={func}>
                  <TableBody.Content className="font-medium">
                    {func}{" "}
                    <span className="text-xs text-neutral-400">(func)</span>
                  </TableBody.Content>
                  <TableBody.Content>
                    <span
                      className={`${
                        enabled ? "text-success-500" : "text-danger-500"
                      } inline-flex`}
                    >
                      {enabled ? <PassesIcon /> : <ErrorIcon />}

                      {enabled ? "Yes" : "No"}
                    </span>
                  </TableBody.Content>
                </TableBody.Row>
              )
            )}
          </TableBody>
        </StatusCheckerBox>
      </div>

      {(requirements["errors"] && requirements["errors"] == true) ||
      php["supported"] == false ? (
        <ButtonNavError />
      ) : (
        <ButtonNavSuccess url={route("install.permissions")} />
      )}
    </InstallationLayout>
  );
}
