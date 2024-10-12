<?php

namespace App\Services\Translate;

use App\Services\Service;
use App\Models\Translate;
use App\Enum\DisplayModeType;
use App\DataTables\Translate\TranslateDataTable;
use App\Http\Resources\Translate\TranslateResource;

class TranslateService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(string $type): array
    {
        $type = DisplayModeType::fromValue($type);

        try {
            // if request had key 'type' with value 'box' or 'table'
            // then return the data in the format of box or table
            $data = null;

            // Set the data table if the type is not box
            if ($type !== DisplayModeType::BOX) {
                $dataTable = new TranslateDataTable($this->languageInterface);
            }

            switch ($type) {
            case DisplayModeType::BOX:
                $data = $this->languageInterface->all();

                // Filter the data based on group
                $filteredData = collect($data)->reduce(function ($result, object $item) {
                    $result[$item->group][] = new TranslateResource($item);
                    return $result;
                }, []);

                // Sort filtered data based on group size (largest group first)
                uasort($filteredData, fn($a, $b) => count($b) <=> count($a));

                // Convert the filtered data to the desired format
                $data = array_map(fn($group, $translations) => [
                    'group' => $group,
                    'translations' => $translations,
                ], array_keys($filteredData), $filteredData);
                break;
            case DisplayModeType::TABLE:
                $data = $dataTable->getData(10);
                break;
            default:
                $data = $dataTable->getData(10);
                break;
            }

            $queryParams = request()->query() ?: null;

            return compact('data', 'queryParams');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        $backUrl = session()->get('translate.translate.url') ?? route('translate.index', ['table']);

        return compact('backUrl');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        try {
            $this->languageInterface->create($request);

            session()->flash('success', 'Data has been created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to create.');

            throw $th;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function show(Translate $data): array
    {
        $backUrl = session()->get('translate.translate.url') ?? route('translate.index', ['table']);

        return compact('data', 'backUrl');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function edit(Translate $translate): array
    {
        $backUrl = session()->get('translate.translate.url') ?? route('translate.index', ['table']);

        return compact('translate', 'backUrl');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param array $request
     * @param int $id
     *
     * @return void
     */
    public function update(array $request, int $id): void
    {
        try {
            $this->languageInterface->update($id, $request);

            session()->flash('success', 'Data has been updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to update.');

            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return void
     */
    public function destroy(int $id): void
    {
        try {
            $this->languageInterface->deleteById($id);

            session()->flash('success', 'Data has been deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to delete.');

            throw $th;
        }
    }
}
