<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use App\Observers\TranslateObserver;
use Spatie\Activitylog\Traits\LogsActivity;
use ElipZis\Cacheable\Models\Traits\Cacheable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Spatie\TranslationLoader\LanguageLine as SpatieTranslate;

#[ObservedBy([TranslateObserver::class])]
class Translate extends SpatieTranslate
{
    use HasFactory, LogsActivity, Cacheable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'language_lines';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * The spatie log that setting log option.
     *
     * @var bool
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['group', 'key', 'text'])
            ->useLogName('model')
            ->setDescriptionForEvent(fn (string $eventName) => trans('model.activity.description', ['model' => $this->table, 'event' => $eventName]))
            ->dontSubmitEmptyLogs();
    }

    /**
     * The cacheable properties that should be cached.
     *
     * @return array
     */
    public function getCacheableProperties(): array {
        $overrided = [
            'prefix' => 'translatecache',
        ];

        return array_merge(config('cacheable'), $overrided);
    }
}
